import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { userContext } from '../components/UserContext';
import { Register } from '../types/UserTypes';
import { postRegisteredUser } from '../services/LoginService';

const background = require("../assets/background.png");

type LoginProp = {
  navigation: StackNavigationProp<any>;
};

const Login: React.FC<LoginProp> = ({ navigation }) => {
  const { user, userFunc, toggleLogin } = React.useContext(userContext);

  const handleInputChange = (field: string, value: string) => {
    userFunc({ ...user, [field]: value });
  }

  const handleRegister = async () => {
    const registeredUser: Register = {
      name: user.name,
      email: user.email,
      password: user.password
    };

    if (!registeredUser.name || !registeredUser.email || !registeredUser.password) {
      Alert.alert("ERROR: VALORES NO VÁLIDOS");
    } else {
      try {
        const newUser: Register = await postRegisteredUser(registeredUser);

        if (newUser) {
          Alert.alert(`Usuario registrado: ${newUser.name}`);
          userFunc(newUser);
          toggleLogin();
          navigation.navigate("Inicio");
        } else {
          Alert.alert("ERROR: Fallo en el registro");
        }
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        Alert.alert("ERROR: Fallo en el registro");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage} />
      <View style={styles.viewButtons}>
        <Text style={styles.subtitleText}>Introduce tus datos</Text>
        <TextInput style={styles.inputText} placeholder="Email" value={user.email} onChangeText={email => handleInputChange("email", email)} />
        <TextInput style={styles.inputText} placeholder="Usuario" value={user.name} onChangeText={userName => handleInputChange("name", userName)} />
        <TextInput style={styles.inputText} placeholder="Contraseña" value={user.password} secureTextEntry={true} onChangeText={password => handleInputChange("password", password)} />
        <TouchableOpacity style={styles.submit} onPress={() => handleRegister()}>
          <Text style={styles.textButton}>Registrar</Text>
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
