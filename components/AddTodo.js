import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
} from "react-native";

const AddTodo = ({ add }) => {
  const [name, setName] = useState("");

  const clearInput = () => {
    setName("");
  };

  const handleAddPress = () => {
    const trimmedName = name.trim();
    if (trimmedName !== "") {
      add(trimmedName);
      clearInput();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    marginBottom: 30,
  },
  addButtonContainer: {
    marginBottom: 10,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    border: "1px solid",
    borderRadius: 8,
  },
  textInputContainer: {
    marginBottom: 20,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  textInput: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    textAlign: "center",
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default AddTodo;
