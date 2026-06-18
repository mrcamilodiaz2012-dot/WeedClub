create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  province text,
  lat numeric not null,
  lng numeric not null
);

-- Habilitar extensión para búsquedas rápidas (si no existe)
create extension if not exists pg_trgm;

-- Crear índice para búsqueda rápida en el nombre
create index locations_name_trgm_idx on public.locations using gin (name gin_trgm_ops);

-- Set RLS
alter table public.locations enable row level security;

create policy "Public locations are viewable by everyone." 
on public.locations for select using (true);

-- Insertar algunas ubicaciones de prueba para que podamos validar la funcionalidad
insert into public.locations (name, province, lat, lng) values
('Madrid', 'Madrid', 40.4168, -3.7038),
('Barcelona', 'Barcelona', 41.3851, 2.1734),
('Valencia', 'Valencia', 39.4699, -0.3774),
('Sevilla', 'Sevilla', 37.3891, -5.9845),
('Zaragoza', 'Zaragoza', 41.6488, -0.8891),
('Málaga', 'Málaga', 36.7213, -4.4214),
('Murcia', 'Murcia', 37.9922, -1.1307),
('Palma de Mallorca', 'Islas Baleares', 39.5696, 2.6502),
('Las Palmas de Gran Canaria', 'Las Palmas', 28.1235, -15.4363),
('Alicante', 'Alicante', 38.3452, -0.4810),
('Móstoles', 'Madrid', 40.3235, -3.8647),
('Marbella', 'Málaga', 36.5101, -4.8824),
('Sitges', 'Barcelona', 41.2372, 1.8059),
('Granollers', 'Barcelona', 41.6083, 2.2883),
('Badalona', 'Barcelona', 41.4500, 2.2474);
