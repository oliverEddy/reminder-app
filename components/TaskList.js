import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./TodoItem";
import TodoItemButtons from "./TodoItemButtons";

const TaskList = ({ tasks, closeRow, onDeleteTask }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  return (
    <SwipeListView
      data={tasks}
      renderItem={TodoItem}
      renderHiddenItem={(hiddenData, rowMap) =>
        TodoItemButtons(hiddenData, rowMap, (rowMap, itemKeyToDelete) => {
          closeRow(rowMap, itemKeyToDelete);
          onDeleteTask(itemKeyToDelete); // Call the onDeleteTask function
        })
      }
      rightOpenValue={-130}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
};

export default TaskList;
