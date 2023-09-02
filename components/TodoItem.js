import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TodoItem = ({ item: { timestamp, name } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.taskName}>{name}</Text>
        <Text style={styles.taskDate}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContainer: {
    width: "80%", // Take up 80% of the screen
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "white", // Set background color to white
  },
  taskName: {
    fontSize: 18, // Customize font size for the task name
    fontWeight: "bold", // Optional: Add bold style
    marginBottom: 5, // Optional: Add margin between name and date
    textAlign: "center",
  },
  taskDate: {
    fontSize: 16, // Customize font size for the date
    textAlign: "center",
  },
});

export default TodoItem;
