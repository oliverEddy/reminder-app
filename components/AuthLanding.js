import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AuthLanding = ({ onAuthenticationSuccess, handleFingerprintAuth }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to Your Reminders.</Text>
        <Text style={styles.subText}>
          Let's tackle your tasks one at a time!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.authButton}
        activeOpacity={1}
        onPress={() => {
          handleFingerprintAuth().then((success) => {
            if (success) {
              onAuthenticationSuccess();
            }
          });
        }}
      >
        <Text style={styles.buttonText}>Unlock with Fingerprint</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  subText: {
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    color: "black",
    marginBottom: 10,
    fontStyle: "italic",
  },
  buttonContainer: {
    marginBottom: 40,
    fontSize: "24",
  },
  authButton: {
    backgroundColor: "#3498DB",
    padding: 18,
    borderRadius: 8,
    marginBottom: 55,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default AuthLanding;
