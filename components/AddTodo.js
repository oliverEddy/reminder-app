import React, { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";

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
      {/* Container for Text Input */}
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Container for "Add" Button */}
      <View style={styles.addButtonContainer}>
        <Button title="Add" onPress={handleAddPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "column",
    marginBottom: 50, // Adjust this value to move the entire container up
  },
  addButtonContainer: {
    marginBottom: 10, // Adjust this value for spacing between the button and text input
  },
  textInputContainer: {
    marginBottom: 10, // Adjust this value for spacing between the text input and button
  },
  textInput: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
  },
});

export default AddTodo;
