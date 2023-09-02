import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TodoItem = ({ item: { timestamp, name } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text>{timestamp}</Text>
        <Text>{name}</Text>
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
});

export default TodoItem;
