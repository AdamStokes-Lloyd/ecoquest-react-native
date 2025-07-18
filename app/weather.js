import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const CITY = 'London'; // You can update this dynamically later
const API_KEY = 'cce413d64d0d72d866af8ce9466cb011'; // <-- replace with yours

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!weather || weather.cod !== 200) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Could not load weather data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in {weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text>{weather.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  temp: { fontSize: 48, fontWeight: 'bold' },
  error: { fontSize: 18, color: 'red' },
});