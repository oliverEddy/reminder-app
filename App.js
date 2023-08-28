import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import TaskList from "./components/TaskList.js";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const addTask = (dateTime) => {
    const newTasks = [...tasks];
    newTasks.push({
      name: taskName,
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });

    setTasks(newTasks);
    scheduleNotification(dateTime, taskName, "Your task is due!");
    setDateTimePickerMode("date");
  };

  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const handleTaskAdd = (name) => {
    setTaskName(name);
    setSelectedDateTime(new Date());
    setDatePickerVisible(true);
  };

  const handleDateTimeChange = (event, dateString) => {
    setDatePickerVisible(false);
    if (dateString) {
      if (currentDateTimePickerMode === "date") {
        handleDateChange(dateString);
      } else if (currentDateTimePickerMode === "time") {
        handleTimeChange(dateString);
      }
    } else {
      setDateTimePickerMode("date");
    }
  };

  const handleDateChange = (dateString) => {
    const date = new Date(dateString) || new Date();
    setSelectedDateTime(date);
    setDateTimePickerMode("time");
    setDatePickerVisible(true);
  };

  const handleTimeChange = (dateString) => {
    const time = new Date(dateString) || new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = 0;
    const newDate = new Date(selectedDateTime);

    // Set the time based on the selected hours and minutes
    newDate.setHours(hours, minutes, seconds);
    setSelectedDateTime(newDate);
    addTask(newDate); // Pass the updated selectedDateTime to addTask
  };

  const handleDeleteTask = (itemKeyToDelete) => {
    const newTasks = tasks.filter((task) => task.key !== itemKeyToDelete);
    setTasks(newTasks);
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: 50,
          height: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Reminders
        </Text>
        <AddTodo add={handleTaskAdd} />
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <TaskList
            tasks={tasks}
            closeRow={closeRow}
            onDeleteTask={handleDeleteTask} // Pass the onDeleteTask function
          />
        </View>
      </View>

      {isDatePickerVisible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          // @ts-ignore
          mode={currentDateTimePickerMode}
          onChange={handleDateTimeChange}
        />
      ) : null}
    </View>
  );
}
