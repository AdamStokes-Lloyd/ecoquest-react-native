import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

const CITY = 'London'; // We'll make this dynamic later
const API_KEY = 'cce413d64d0d72d866af8ce9466cb011';

export default function HomeScreen() {
  const { name } = useLocalSearchParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        if (data?.main?.temp) {
          const icon = data.weather[0].icon;
          const emoji = mapWeatherIconToEmoji(icon);
          setWeather(`${emoji} ${CITY}, ${Math.round(data.main.temp)}°C`);
        } else {
          setWeather('Weather unavailable');
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        setWeather('Weather error');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  function mapWeatherIconToEmoji(iconCode) {
    const map = {
      '01': '☀️',
      '02': '🌤️',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧️',
      '10': '🌦️',
      '11': '⛈️',
      '13': '❄️',
      '50': '🌫️',
    };
    return map[iconCode?.slice(0, 2)] || '❓';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name || 'Eco-Hero'}!</Text>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={styles.weather}>{weather}</Text>
      )}
      <Link href="/devices" style={styles.link}>🌡️ View Devices</Link>
      <Link href="/characters" style={styles.link}>🦎 See Your Friends</Link>
      <Link href="/leaderboard" style={styles.link}>🏆 Leaderboard</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  weather: { fontSize: 16, marginBottom: 12 },
  link: { fontSize: 18, color: '#2563eb', paddingVertical: 6 },
});