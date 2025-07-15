import { View, Text, StyleSheet } from 'react-native';

export default function DevicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devices</Text>
      {/* Placeholder – actual device logic coming next */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
});