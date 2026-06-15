import useSWR from 'swr';
import { createClient } from '@/utils/supabase/client';
import { useDebounce } from 'use-debounce';

const fetcher = async ([lat, lon, radius_km, amenity]: [number, number, number, string | null]) => {
  const supabase = createClient();
  
  // Por ahora llamamos al RPC básico. 
  // TODO: Actualizar el RPC en Supabase para que acepte un filtro de amenity si es necesario, 
  // o filtrarlo en memoria si el dataset inicial es pequeño.
  const { data, error } = await supabase.rpc('get_nearby_clubs', { lat, lon, radius_km });
  
  if (error) throw new Error(error.message);
  
  // Filtrado muy básico en cliente por ahora para la demo
  let results = data || [];
  if (amenity) {
    // Si tuviéramos un RPC más avanzado, esto iría allí.
    // Como get_nearby_clubs no retorna club_amenities expandido, 
    // asumimos que el endpoint será mejorado. Por ahora devolvemos todo.
  }
  
  return results;
};

export const useClubsMap = (lat: number, lon: number, radius_km: number, amenity: string | null = null) => {
  // Aplicar un debounce a las coordenadas para no bombardear a Supabase mientras el usuario arrastra el mapa
  const [debouncedLat] = useDebounce(lat, 500);
  const [debouncedLon] = useDebounce(lon, 500);
  const [debouncedRadius] = useDebounce(radius_km, 500);

  // Redondeamos un poco las coordenadas en la clave de caché para reutilizar resultados 
  // si el usuario mueve el mapa unos metros.
  const cacheKeyLat = Number(debouncedLat).toFixed(3);
  const cacheKeyLon = Number(debouncedLon).toFixed(3);

  const { data, error, isLoading } = useSWR(
    // La clave es el array de argumentos. Si no hay coords válidas, no hace fetch.
    debouncedLat && debouncedLon ? [parseFloat(cacheKeyLat), parseFloat(cacheKeyLon), debouncedRadius, amenity] : null,
    fetcher,
    {
      revalidateOnFocus: false, // No recargar al cambiar de tab
      dedupingInterval: 60000, // Reutilizar caché por 1 minuto
    }
  );

  return {
    clubs: data || [],
    isLoading,
    isError: error
  };
};
