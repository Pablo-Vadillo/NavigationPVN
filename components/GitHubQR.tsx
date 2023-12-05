
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const GitHubQR = () => {
  const githubRepoURL = "https://github.com/Pablo_Vadillo";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escanear el código QR para acceder a  mi GitHub:</Text>
      <QRCode
        value={githubRepoURL}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: 'center'
  },
});

export default GitHubQR;
