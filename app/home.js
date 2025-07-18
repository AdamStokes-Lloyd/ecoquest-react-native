import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name || 'Eco-Hero'}!</Text>

      {/* Weather UI Placeholder */}
      <View style={styles.weatherBox}>
        <Text style={styles.weatherText}>🌤️ Current Weather: 22°C, Sunny</Text>
        <Text style={styles.tipText}>Tip: Close your blinds during peak sun hours to save energy!</Text>
      </View>

      <Link href="/devices" style={styles.link}>🌡️ View Devices</Link>
      <Link href="/characters" style={styles.link}>🦎 See Your Friends</Link>
      <Link href="/leaderboard" style={styles.link}>🏆 Leaderboard</Link>
      <Link href="/chatbot" style={styles.link}>🤖 Ask the Eco Chatbot</Link>
      <Link href="/weather" style={styles.link}>⛅ Check the Weather</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  weatherBox: { padding: 16, backgroundColor: '#e0f2f1', borderRadius: 10, alignItems: 'center' },
  weatherText: { fontSize: 16, fontWeight: '600' },
  tipText: { fontSize: 14, color: '#333', marginTop: 8 },
  link: { fontSize: 18, color: '#2563eb', paddingVertical: 8 },
});