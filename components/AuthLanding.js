import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AuthLanding = ({ onAuthenticationSuccess, handleFingerprintAuth }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Your Reminders. Let's tackle your tasks one at a time!
      </Text>
      <Button
        title="Authenticate with Fingerprint"
        onPress={() => {
          handleFingerprintAuth().then((success) => {
            if (success) {
              onAuthenticationSuccess();
            }
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default AuthLanding;
