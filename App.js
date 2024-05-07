import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здарова збл!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ee9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"#933",
    fontSize:26, 
    fontWeight:"900"
  }
});
