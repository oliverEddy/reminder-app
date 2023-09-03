import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TodoItemButtons = ({ data, rowMap, deleteRow }) => (
  <View style={styles.container}>
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? styles.pressedColor : styles.normalColor },
      ]}
      onPress={() => {
        console.log("Deleting item with key:", data.item.key);
        deleteRow(rowMap, data.item.key);
      }}
    >
      <MaterialIcons name="delete" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 50,
  },
});

export default TodoItemButtons;
