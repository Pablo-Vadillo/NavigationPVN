import { StyleSheet,View } from 'react-native';
import AppDrawer from './components/AppDrawer';
import UserProvider from './components/Provider';

export default function App() {
  return (
  <View style={styles.container}>
    <UserProvider>
      <AppDrawer></AppDrawer>
    </UserProvider>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'black'
  }
});
