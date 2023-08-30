import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import TaskList from "./components/TaskList.js";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { setupNotifications, scheduleNotification } from "./api/notification";
import { authenticateAsync } from "expo-local-authentication";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      const storedTasks = await getStorage();
      setTasks(storedTasks);
    }
    fetchTasks();
    setupNotifications();
  }, []);

  const addTask = (dateTime) => {
    const newTasks = [...tasks];
    newTasks.push({
      name: taskName,
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });

    setTasks(newTasks);
    scheduleNotification(dateTime, taskName, "Your task is due!"); // Schedule notification
    updateStorage(newTasks); // Save tasks to local storage
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
    newDate.setHours(hours, minutes, seconds);
    setSelectedDateTime(newDate);
    addTask(newDate); // Pass the updated selectedDateTime to addTask
  };

  const handleDeleteTask = (itemKeyToDelete) => {
    const newTasks = tasks.filter((task) => task.key !== itemKeyToDelete);
    setTasks(newTasks);
    updateStorage(newTasks); // Save tasks to local storage
  };

  const handleFingerprintAuth = async () => {
    try {
      const { success } = await authenticateAsync();
      if (success) {
        setIsAuthenticated(true);
      } else {
        // Handle authentication failure
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Display Tasks if Authenticated */}
        {isAuthenticated && (
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
                onDeleteTask={handleDeleteTask}
              />
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
        )}
      </View>

      {/* Authenticate with Fingerprint Button */}
      {!isAuthenticated && (
        <View
          style={{
            justifyContent: "flex-end",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Button
            title="Authenticate with Fingerprint"
            onPress={handleFingerprintAuth}
          />
        </View>
      )}
    </View>
  );
}
