import type { Club } from '@repo/core';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPublicClubs } from '../utils/clubs';

const SITE_URL = (process.env.EXPO_PUBLIC_SITE_URL || 'https://weedclub.es').replace(/\/$/, '');

function ClubCard({ club, onPress }: { club: Club; onPress: () => void }) {
  const image = club.cover_image_url ?? club.photos[0] ?? club.logo_url;
  const location = [club.city, club.province].filter(Boolean).join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver ${club.name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
      ) : (
        <View style={[styles.cardImage, styles.imageFallback]}>
          <Text style={styles.imageFallbackText}>{club.name.slice(0, 1).toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text numberOfLines={1} style={styles.cardTitle}>{club.name}</Text>
          {club.is_claimed ? <Text style={styles.managedBadge}>Gestionado</Text> : null}
        </View>
        <Text numberOfLines={1} style={styles.cardLocation}>{location || 'Ubicación por confirmar'}</Text>
        <View style={styles.cardMetaRow}>
          {club.review_count > 0 ? (
            <Text style={styles.cardMeta}>★ {club.rating.toFixed(1)} · {club.review_count} reseñas</Text>
          ) : (
            <Text style={styles.cardMeta}>Ficha pública del club</Text>
          )}
          <Text style={styles.openLabel}>Ver ficha →</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function Home() {
  const router = useRouter();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadClubs = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setClubs(await getPublicClubs());
    } catch {
      setError('No hemos podido cargar los clubes. Comprueba tu conexión e inténtalo de nuevo.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadClubs();
  }, [loadClubs]);

  const filteredClubs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    if (!normalizedQuery) return clubs;
    return clubs.filter((club) =>
      [club.name, club.city, club.province, ...club.amenities]
        .filter(Boolean)
        .some((value) => value?.toLocaleLowerCase('es').includes(normalizedQuery))
    );
  }, [clubs, query]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <FlatList
        data={filteredClubs}
        keyExtractor={(club) => club.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void loadClubs(true)} tintColor="#129447" />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>DIRECTORIO DE CLUBES</Text>
            <Text style={styles.brand}>WeedClub</Text>
            <Text style={styles.intro}>
              Encuentra clubes y consulta información pública, horarios, servicios y formas de contacto.
            </Text>
            <TextInput
              accessibilityLabel="Buscar clubes"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setQuery}
              placeholder="Buscar por nombre, ciudad o servicio"
              placeholderTextColor="#7d827f"
              returnKeyType="search"
              style={styles.searchInput}
              value={query}
            />
            <View style={styles.resultRow}>
              <Text style={styles.resultText}>
                {filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubes'}
              </Text>
              <Pressable onPress={() => void Linking.openURL(`${SITE_URL}/club/acceso`)}>
                <Text style={styles.ownerLink}>¿Gestionas un club?</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ClubCard
            club={item}
            onPress={() => router.push({ pathname: '/clubs/[slug]', params: { slug: item.slug } })}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.stateBox}>
              <ActivityIndicator size="large" color="#129447" />
              <Text style={styles.stateText}>Cargando clubes…</Text>
            </View>
          ) : (
            <View style={styles.stateBox}>
              <Text style={styles.stateTitle}>{error ? 'No se pudo cargar' : 'Sin resultados'}</Text>
              <Text style={styles.stateText}>
                {error ?? 'Prueba con otro nombre, ciudad o servicio.'}
              </Text>
              {error ? (
                <Pressable style={styles.retryButton} onPress={() => void loadClubs()}>
                  <Text style={styles.retryButtonText}>Reintentar</Text>
                </Pressable>
              ) : null}
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f6f5' },
  listContent: { paddingHorizontal: 18, paddingBottom: 40 },
  header: { paddingTop: 24, paddingBottom: 14 },
  eyebrow: { color: '#129447', fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  brand: { color: '#101311', fontSize: 38, fontWeight: '900', letterSpacing: -1.5, marginTop: 4 },
  intro: { color: '#59605b', fontSize: 16, lineHeight: 23, marginTop: 8, maxWidth: 620 },
  searchInput: {
    backgroundColor: '#ffffff', borderColor: '#e1e5e2', borderRadius: 14, borderWidth: 1,
    color: '#101311', fontSize: 16, marginTop: 20, paddingHorizontal: 16, paddingVertical: 14,
  },
  resultRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  resultText: { color: '#59605b', fontSize: 13, fontWeight: '600' },
  ownerLink: { color: '#0b7c39', fontSize: 13, fontWeight: '800' },
  card: {
    backgroundColor: '#ffffff', borderColor: '#e4e8e5', borderRadius: 18, borderWidth: 1,
    marginBottom: 14, overflow: 'hidden', shadowColor: '#000000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.995 }] },
  cardImage: { backgroundColor: '#dceee2', height: 178, width: '100%' },
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#129447', fontSize: 58, fontWeight: '900' },
  cardBody: { padding: 15 },
  cardTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  cardTitle: { color: '#101311', flex: 1, fontSize: 20, fontWeight: '800' },
  managedBadge: {
    backgroundColor: '#e7f6ec', borderRadius: 999, color: '#0b7c39', fontSize: 10,
    fontWeight: '800', overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 5,
  },
  cardLocation: { color: '#666d68', fontSize: 14, marginTop: 5 },
  cardMetaRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  cardMeta: { color: '#676e69', fontSize: 12 },
  openLabel: { color: '#0b7c39', fontSize: 13, fontWeight: '800' },
  stateBox: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 54 },
  stateTitle: { color: '#101311', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  stateText: { color: '#666d68', fontSize: 15, lineHeight: 22, marginTop: 12, textAlign: 'center' },
  retryButton: { backgroundColor: '#129447', borderRadius: 12, marginTop: 18, paddingHorizontal: 20, paddingVertical: 12 },
  retryButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
});
