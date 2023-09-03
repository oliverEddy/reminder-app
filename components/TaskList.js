import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";

import TodoItem from "./TodoItem";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const TaskList = ({ tasks, closeRow, onDeleteTask }) => {
  return (
    <SwipeListView
      style={styles.container}
      data={tasks}
      renderItem={TodoItem}
      renderHiddenItem={(hiddenData, rowMap) => (
        <View style={styles.hiddenItemContainer}>
          <TouchableOpacity
            style={styles.hiddenItemButton}
            onPress={() => {
              closeRow(rowMap, hiddenData.item.key);
              onDeleteTask(hiddenData.item.key);
            }}
          >
            <MaterialIcons name="delete" color="white" size={24} />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100}
    />
  );
};

const styles = StyleSheet.create({
  // ...
  container: { backgroundColor: " #f9f9f9" },
  hiddenItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "90%",
  },
  hiddenItemButton: {
    backgroundColor: "#FF5555",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "74%",
    borderRadius: 8,
  },
  hiddenItemButtonText: {
    color: "white",
  },
});

export default TaskList;
