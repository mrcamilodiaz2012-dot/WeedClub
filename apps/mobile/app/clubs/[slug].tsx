import type { Club } from '@repo/core';
import * as Linking from 'expo-linking';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getPublicClub } from '../../utils/clubs';

const SITE_URL = (process.env.EXPO_PUBLIC_SITE_URL || 'https://weedclub.es').replace(/\/$/, '');
const DAY_LABELS: Record<string, string> = {
  monday: 'Lunes', lunes: 'Lunes',
  tuesday: 'Martes', martes: 'Martes',
  wednesday: 'Miércoles', miercoles: 'Miércoles', miércoles: 'Miércoles',
  thursday: 'Jueves', jueves: 'Jueves',
  friday: 'Viernes', viernes: 'Viernes',
  saturday: 'Sábado', sabado: 'Sábado', sábado: 'Sábado',
  sunday: 'Domingo', domingo: 'Domingo',
};

function externalUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
    >
      <Text style={styles.actionButtonText}>{label}</Text>
    </Pressable>
  );
}

export default function ClubDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClub = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getPublicClub(slug);
      setClub(result);
      if (!result) setError('Este club no está disponible en el directorio público.');
    } catch {
      setError('No hemos podido cargar esta ficha. Comprueba tu conexión e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadClub();
  }, [loadClub]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#129447" />
        <Text style={styles.muted}>Cargando ficha…</Text>
      </View>
    );
  }

  if (!club || error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Ficha no disponible</Text>
        <Text style={styles.muted}>{error}</Text>
        <Pressable style={styles.primaryButton} onPress={() => void loadClub()}>
          <Text style={styles.primaryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const heroImage = club.cover_image_url ?? club.photos[0] ?? club.logo_url;
  const location = [club.address, club.city, club.province, club.postal_code].filter(Boolean).join(', ');
  const gallery = club.photos.filter((photo) => photo !== heroImage);
  const hours = Object.entries(club.opening_hours);

  return (
    <>
      <Stack.Screen options={{ title: club.name }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {heroImage ? (
          <Image source={{ uri: heroImage }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={[styles.heroImage, styles.imageFallback]}>
            <Text style={styles.imageFallbackText}>{club.name.slice(0, 1).toUpperCase()}</Text>
          </View>
        )}

        <View style={styles.mainCard}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{club.name}</Text>
            {club.is_claimed ? <Text style={styles.managedBadge}>Gestionado</Text> : null}
          </View>
          <Text style={styles.location}>{location || 'Ubicación por confirmar'}</Text>
          {club.review_count > 0 ? (
            <Text style={styles.rating}>★ {club.rating.toFixed(1)} · {club.review_count} reseñas históricas</Text>
          ) : null}

          <View style={styles.actions}>
            {club.phone ? (
              <ActionButton label="Llamar" onPress={() => void Linking.openURL(`tel:${club.phone}`)} />
            ) : null}
            {club.whatsapp ? (
              <ActionButton
                label="WhatsApp"
                onPress={() => void Linking.openURL(`https://wa.me/${club.whatsapp?.replace(/\D/g, '')}`)}
              />
            ) : null}
            {club.website_url ? (
              <ActionButton label="Web" onPress={() => void Linking.openURL(externalUrl(club.website_url!))} />
            ) : null}
            {club.lat !== null && club.lng !== null ? (
              <ActionButton
                label="Cómo llegar"
                onPress={() => void Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${club.lat},${club.lng}`)}
              />
            ) : null}
          </View>
        </View>

        {club.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre el club</Text>
            <Text style={styles.bodyText}>{club.description}</Text>
          </View>
        ) : null}

        {club.amenities.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <View style={styles.chipRow}>
              {club.amenities.map((amenity) => <Text key={amenity} style={styles.chip}>{amenity}</Text>)}
            </View>
          </View>
        ) : null}

        {hours.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horarios</Text>
            {hours.map(([day, schedule]) => (
              <View key={day} style={styles.hoursRow}>
                <Text style={styles.hoursDay}>{DAY_LABELS[day.toLocaleLowerCase('es')] ?? day}</Text>
                <Text style={styles.hoursValue}>{schedule}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {gallery.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fotos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
              {gallery.map((photo) => <Image key={photo} source={{ uri: photo }} style={styles.galleryImage} />)}
            </ScrollView>
          </View>
        ) : null}

        {club.instagram_url || club.email ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Más contacto</Text>
            {club.email ? (
              <Pressable onPress={() => void Linking.openURL(`mailto:${club.email}`)}>
                <Text style={styles.textLink}>{club.email}</Text>
              </Pressable>
            ) : null}
            {club.instagram_url ? (
              <Pressable onPress={() => void Linking.openURL(externalUrl(club.instagram_url!))}>
                <Text style={styles.textLink}>Instagram</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {!club.is_claimed ? (
          <View style={styles.ownerCard}>
            <Text style={styles.ownerTitle}>¿Representas a este club?</Text>
            <Text style={styles.ownerText}>Solicita la gestión de la ficha desde el panel web para propietarios.</Text>
            <Pressable
              style={styles.primaryButton}
              onPress={() => void Linking.openURL(`${SITE_URL}/club/reclamar?club=${club.id}`)}
            >
              <Text style={styles.primaryButtonText}>Reclamar este club</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#f5f6f5', flex: 1 },
  content: { paddingBottom: 42 },
  centered: { alignItems: 'center', backgroundColor: '#f5f6f5', flex: 1, justifyContent: 'center', padding: 28 },
  muted: { color: '#666d68', fontSize: 15, lineHeight: 22, marginTop: 12, textAlign: 'center' },
  errorTitle: { color: '#101311', fontSize: 22, fontWeight: '800' },
  heroImage: { backgroundColor: '#dceee2', height: 270, width: '100%' },
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: '#129447', fontSize: 78, fontWeight: '900' },
  mainCard: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 22 },
  titleRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  title: { color: '#101311', flex: 1, fontSize: 28, fontWeight: '900', letterSpacing: -0.7 },
  managedBadge: {
    backgroundColor: '#e7f6ec', borderRadius: 999, color: '#0b7c39', fontSize: 11,
    fontWeight: '800', overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 6,
  },
  location: { color: '#646b66', fontSize: 15, lineHeight: 21, marginTop: 7 },
  rating: { color: '#3d453f', fontSize: 13, fontWeight: '700', marginTop: 10 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  actionButton: { backgroundColor: '#eef1ef', borderRadius: 11, paddingHorizontal: 14, paddingVertical: 11 },
  actionButtonText: { color: '#151916', fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.7 },
  section: { backgroundColor: '#ffffff', borderRadius: 18, marginHorizontal: 16, marginTop: 14, padding: 18 },
  sectionTitle: { color: '#101311', fontSize: 19, fontWeight: '800', marginBottom: 12 },
  bodyText: { color: '#4f5651', fontSize: 15, lineHeight: 23 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#eef7f1', borderRadius: 999, color: '#176b37', fontSize: 13,
    fontWeight: '700', overflow: 'hidden', paddingHorizontal: 11, paddingVertical: 7,
  },
  hoursRow: { borderBottomColor: '#edf0ee', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  hoursDay: { color: '#343a36', fontSize: 14, fontWeight: '700' },
  hoursValue: { color: '#666d68', fontSize: 14 },
  gallery: { gap: 10 },
  galleryImage: { backgroundColor: '#e3e7e4', borderRadius: 13, height: 140, width: 210 },
  textLink: { color: '#0b7c39', fontSize: 15, fontWeight: '700', paddingVertical: 7 },
  ownerCard: { backgroundColor: '#132318', borderRadius: 18, marginHorizontal: 16, marginTop: 14, padding: 20 },
  ownerTitle: { color: '#ffffff', fontSize: 20, fontWeight: '800' },
  ownerText: { color: '#c9d4cc', fontSize: 14, lineHeight: 21, marginTop: 7 },
  primaryButton: { alignSelf: 'center', backgroundColor: '#129447', borderRadius: 12, marginTop: 18, paddingHorizontal: 20, paddingVertical: 13 },
  primaryButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
});
