import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";

import TodoItem from "./TodoItem";
import {
  TextInput,
  View,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import TodoItemButtons from "./TodoItemButtons";

const TaskList = ({ tasks, closeRow, onDeleteTask }) => {
  // ...

  return (
    <SwipeListView
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
      rightOpenValue={-130}
      // ...
    />
  );
};

const styles = StyleSheet.create({
  // ...

  hiddenItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "90%", // Take up 80% of the screen
  },
  hiddenItemButton: {
    backgroundColor: "red", // Customize the button color
    justifyContent: "center",
    alignItems: "center",
    width: 60, // Adjust the width as needed
    height: "86%", // Fill the height of the task container
    borderRadius: 8,
  },
  hiddenItemButtonText: {
    color: "white", // Customize the text color
  },
});

export default TaskList;
