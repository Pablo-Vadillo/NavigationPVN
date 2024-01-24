import { StackNavigationProp } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { userContext } from '../components/UserContext';
import React, { useState } from 'react';
import { getlogOut } from '../services/LoginService';
const background = require("../assets/background.png");

type BienvenidaProp = {
  navigation: StackNavigationProp<any>
}
const Bienvenida: React.FC<BienvenidaProp> = ({ navigation }) => {
  const { user, isLogged, toggleLogin } = React.useContext(userContext)

  const handleLogOut = async () => {
    const result = await getlogOut()
    if (result != null) {
      toggleLogin()
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.viewBottons}>
          {isLogged ? <Text style={styles.overtitleText}>Hola {user.name}</Text> :
            null}
          <Text style={styles.overtitleText}>Soy</Text>
          <Text style={styles.titleText}>Vadillo</Text>
          <Text style={styles.subtitleText}> Bienvenido a mi portfolio.</Text>

          {isLogged ? <><Text style={styles.overtitleText}>
            Ya estas Logeado</Text><TouchableOpacity style={styles.submit}
              onPress={() =>
                handleLogOut()}><Text>Cerrar Sesion</Text></TouchableOpacity></>
            :

            <><TouchableOpacity style={styles.submit}
              onPress={() => navigation.navigate("Login")}><Text>Login</Text></TouchableOpacity><TouchableOpacity style={styles.submit}
                onPress={() => navigation.navigate("Register")}><Text>Register</Text></TouchableOpacity></>
          }
        </View>
        <View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Bienvenida

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  viewBottons: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },

  backgroundImage: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  submit: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 100,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center'

  },

  textButton: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: 'black'
  },

  overtitleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',

  },

  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 60,
    fontWeight: "bold",
    color: 'white'
  },

  subtitleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  }
});

