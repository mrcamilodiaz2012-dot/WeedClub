import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ClubDetail() {
  const { slug } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Club: {slug}</Text>
      <Text style={styles.description}>Esta pantalla mostrará el perfil completo, imágenes y reseñas obtenidas de Supabase.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 10,
  },
  description: {
    color: '#9ca3af',
  }
});
