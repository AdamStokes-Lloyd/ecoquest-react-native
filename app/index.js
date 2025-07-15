import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      router.push({ pathname: '/home', params: { name } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EcoQuest!</Text>
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity onPress={handleStart} style={styles.button}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#10b981', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});