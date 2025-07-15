import { View, Text, StyleSheet } from 'react-native';

export default function CharactersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      {/* Placeholder – unlocks and animation logic coming next */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});