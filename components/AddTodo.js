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
      <View style={styles.newContainer}>
        <TextInput
          placeholder="Enter task name..."
          style={styles.text}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button title="Add" onPress={handleAddPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
  },
  newContainer: { flexGrow: 1 },
  text: { width: "100%", height: "100%" },
});

export default AddTodo;
