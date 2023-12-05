import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, Switch
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Profile = {
  name: string;
  image: any;
  about: string;
  likes: string[];
  github: string;
  theme: {
    backgroundColor: string;
    textColor: string;
  };
};

type Profiles = {
  [key: string]: Profile;
};

const profiles: Profiles = {
  persona1: {
    name: "PABLO",
    image: require('../assets/Icons/icon.jpg'),
    about: "Soy Pablo Vadillo Núñez, me gustan el desarrollo y estoy en proceso de aprender aun más",
    likes: ["Desarrollo Web", "Videojuegos", "Música"],
    github: "https://github.com/Pablo-Vadillo",
    theme: {
      backgroundColor: '#ffe4e1',
      textColor: '#b5838d',
    },
  },
};

export default function PortfolioApp() {
  const [selectedProfileKey, setSelectedProfileKey] = useState<keyof Profiles>('persona1');
  const [showLikes, setShowLikes] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const profile = profiles[selectedProfileKey];
  const theme = darkMode ? {
    backgroundColor: '#333333',
    textColor: '#FFFFFF',
    cardBackgroundColor: '#444444'
  } : profile.theme;

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.headerContainer, styles.headerShadow]}>
        <Text style={[styles.titleText, { color: theme.textColor }]}>Mi Portafolio</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
          <TouchableOpacity
            onPress={() => setSelectedProfileKey('persona1')}
            style={[styles.profileButton, { backgroundColor: theme.backgroundColor }]}
          >
            <Text style={{ color: theme.textColor }}>Pablo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.cardContainerStyle, { backgroundColor: theme.backgroundColor}]}>
        <View style={styles.profileHeader}>
          <Image style={styles.profileImage} source={profile.image} />
          <Text style={[styles.profileText, { color: theme.textColor }]}>{profile.name}</Text>
        </View>
        <Text style={[styles.profileAbout, { color: theme.textColor }]}>{profile.about}</Text>

        <TouchableOpacity
          onPress={() => setShowLikes(!showLikes)}
          style={[styles.likesButton, { backgroundColor: theme.backgroundColor }]}
        >
          <Text style={{ color: theme.textColor }}>Ver Gustos</Text>
        </TouchableOpacity>

        {showLikes && (
          <View style={styles.likesContainer}>
            {profile.likes.map((like, index) => (
              <Text key={index} style={[styles.likeText, { color: theme.textColor }]}>
                {like}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.qrContainer}>
          <QRCode value={profile.github} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    height: 100,
    width: '100%',
    backgroundColor: '#f2c0c8',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
  },
  profileButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileAbout: {
    textAlign: 'center',
    marginBottom: 20,
  },
  likesButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  likesButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  likesContainer: {
    marginTop: 10,
  },
  likeText: {
    textAlign: 'center',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardContainerStyle: {
    width: '80%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 120,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
