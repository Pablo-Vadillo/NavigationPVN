import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Portfolio from "../screens/Portfolio"; 
import GitHubQR from "./GitHubQR"; 

const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MyPortfolio"
      activeColor="black"
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="MyPortfolio"
        component={Portfolio}
        options={{
          tabBarLabel: "Mi Portafolio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="badge-account"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GitHubQR"
        component={GitHubQR}
        options={{
          tabBarLabel: "GitHub",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="github" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;