import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { userContext } from '../components/UserContext';

const background = require("../assets/background.png");

type LoginProp = {
  navigation: StackNavigationProp<any>;
};

const Login: React.FC<LoginProp> = ({ navigation }) => {

  const {user,userFunc,toggleLogin} = React.useContext(userContext)

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage} />
      
      <View style={styles.viewButtons}>
        <Text style={styles.subtitleText}>Introduce tus datos</Text>
        <TextInput style={styles.inputText} placeholder="Usuario" value={user} onChangeText={user => userFunc(user)}/>
        <TextInput style={styles.inputText} placeholder="Contraseña" secureTextEntry={true} />
        <TouchableOpacity style={styles.submit} onPress={() => {toggleLogin();navigation.navigate("Inicio")}}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  viewButtons: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    margin: 'auto',
    padding: '2%',
    borderRadius: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  backgroundImage: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },

  submit: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },

  textButton: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  subtitleText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputText: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
