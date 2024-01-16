import React from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

import Bienvenida from '../screens/Bienvenida';
import Login from '../screens/Login';
import { userContext } from './UserContext';
import BootonTabs from './BootonTabs';
import Register from '../screens/Register';

const backgroundHeader = require("../assets/background.png");
const Drawer = createDrawerNavigator();
const DrawerModificaction = {
  swipeEdgeWidth: 0,
};

const CustomDrawerContent: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isLogged } = React.useContext(userContext)

  return (
    <DrawerContentScrollView style={styles.drawerContainer}>
      <DrawerItem
        label="Inicio"
        onPress={() => navigation.navigate("Inicio")}
        labelStyle={styles.drawerItemLabel}
      />
      {isLogged ?
        <DrawerItem
          label="Portfolio"
          onPress={() => navigation.navigate("Portfolio")}
          labelStyle={styles.drawerItemLabel}
        /> :
        <DrawerItem
          label="Login"
          onPress={() => navigation.navigate("Login")}
          labelStyle={styles.drawerItemLabel}
        />
      }


    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Inicio"
          screenOptions={DrawerModificaction}
          drawerContent={(props) => <CustomDrawerContent navigation={props.navigation} />}
        >
          <Drawer.Screen name="Inicio" component={Bienvenida} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Portfolio" component={BootonTabs} />

        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },

  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  drawerItemLabel: {
    color: 'black',
    fontSize: 16,
  },
});


export default AppDrawer;
