import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeedClub</Text>
      <Text style={styles.subtitle}>Directorio geolocalizado en progreso...</Text>
      <Link href="/clubs/green-house-madrid" style={styles.link}>
        Ver Club de Ejemplo
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10b981', // green-500
    marginBottom: 10,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 20,
  },
  link: {
    color: '#fff',
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  }
});
