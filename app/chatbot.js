import { View, Text, StyleSheet } from 'react-native';

export default function ChatbotScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Eco Chatbot</Text>
      <Text style={styles.subtitle}>Chat functionality coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 12 },
});