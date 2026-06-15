-- Función para manejar la creación de un nuevo usuario desde Supabase Auth
-- Usa SECURITY DEFINER para que se ejecute con privilegios de administrador (postgres role)
-- y pueda saltarse las políticas RLS al crear el perfil inicial.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insertamos el nuevo perfil usando los metadatos de auth.users.
  -- Manejo de nulos: Si no hay username, generamos uno por defecto usando el UUID.
  -- Idempotencia: ON CONFLICT DO NOTHING asegura que si el evento se reintenta, no fallará.
  INSERT INTO public.profiles (id, username, avatar_url, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', 'user_' || substr(new.id::text, 1, 8)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que escucha el evento INSERT en la tabla del sistema auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
