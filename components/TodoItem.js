import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TodoItem = ({ item: { timestamp, name } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>{timestamp}</Text>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 50,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
});
export default TodoItem;
