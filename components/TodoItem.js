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
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "white",
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  taskDate: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default TodoItem;
