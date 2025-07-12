import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name || 'Eco-Hero'}!</Text>
      <Link href="/devices" style={styles.link}>🌡️ View Devices</Link>
      <Link href="/characters" style={styles.link}>🦎 See Your Friends</Link>
      <Link href="/leaderboard" style={styles.link}>🏆 Leaderboard</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  link: { fontSize: 18, color: '#2563eb', paddingVertical: 8 },
});