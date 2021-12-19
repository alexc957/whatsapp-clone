import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation';
import app from './src/Firebase/firebase';
import { FirebaseProvider } from './src/Contexts/FirebaseContext';
import Toast from 'react-native-toast-message';
export default function App() {


  return (

    <FirebaseProvider value={app}>
          <Navigation />
          <Toast/>
   </FirebaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
