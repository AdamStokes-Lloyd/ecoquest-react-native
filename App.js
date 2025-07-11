import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with real API key
const CHATBOT_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = 'YOUR_OPENAI_KEY_HERE';

export default function App() {
  const [name, setName] = useState('');
  const [baseTemp, setBaseTemp] = useState('20');
  const [started, setStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [weatherTip, setWeatherTip] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (started) {
      getWeatherTip();
    }
  }, [started]);

  const getWeatherTip = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setWeatherTip('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      const temp = data.main.temp;
      if (temp > 24) {
        setWeatherTip('It’s a hot day! Use blinds to block out heat and reduce AC use.');
      } else if (temp < 16) {
        setWeatherTip('It’s chilly! Add layers before turning up the heat.');
      } else {
        setWeatherTip('Mild weather! Open windows for ventilation instead of fans.');
      }
    } catch (error) {
      setWeatherTip('Unable to fetch weather data.');
    }
  };

  const handleChat = async () => {
    const newEntry = { role: 'user', content: chatInput };
    setChatLog([...chatLog, newEntry]);
    setChatInput('');

    try {
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [...chatLog, newEntry]
        })
      });

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setChatLog([...chatLog, newEntry, botMessage]);
    } catch (error) {
      const failMsg = { role: 'assistant', content: 'Error contacting chatbot API.' };
      setChatLog([...chatLog, newEntry, failMsg]);
    }
  };

  if (!started) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to EcoQuest!</Text>
        <Text style={styles.subtitle}>I'm Kiko! Let’s make a difference together.</Text>
        <TextInput
          placeholder="Enter your name..."
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter base temperature..."
          style={styles.input}
          value={baseTemp}
          onChangeText={setBaseTemp}
          keyboardType="numeric"
        />
        <Button title="Let’s Go!" onPress={() => setStarted(true)} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.title}>Welcome back, {name}!</Text>
      <Text style={styles.points}>Points: {points}</Text>
      <Text style={styles.tip}>{weatherTip}</Text>

      <Text style={styles.section}>Ask the Eco Chatbot</Text>
      <FlatList
        data={chatLog}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === 'user' ? styles.userMessage : styles.botMessage}>{item.content}</Text>
        )}
        style={styles.chatLog}
      />
      <TextInput
        placeholder="Ask about sustainability..."
        style={styles.input}
        value={chatInput}
        onChangeText={setChatInput}
      />
      <Button title="Send" onPress={handleChat} />

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  points: {
    fontSize: 24,
    color: '#2ecc71',
    marginBottom: 10
  },
  tip: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600'
  },
  chatLog: {
    height: 150,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  userMessage: {
    textAlign: 'right',
    color: '#2c3e50'
  },
  botMessage: {
    textAlign: 'left',
    color: '#16a085'
  }
});