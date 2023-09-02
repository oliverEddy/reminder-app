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
import AuthLanding from "./components/AuthLanding";

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

  const formatDate = (date) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    return (
      new Date(date).toLocaleDateString("en-US", options) +
      " " +
      formatAMPM(date)
    );
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  const addTask = (dateTime) => {
    const newTasks = [...tasks];
    newTasks.push({
      name: taskName,
      timestamp: formatDate(dateTime),
      key: new Date().getTime().toString(),
    });

    setTasks(newTasks);
    scheduleNotification(dateTime, taskName, "Your task is due!");
    updateStorage(newTasks);
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
    addTask(newDate);
  };

  const handleDeleteTask = (itemKeyToDelete) => {
    const newTasks = tasks.filter((task) => task.key !== itemKeyToDelete);
    setTasks(newTasks);
    updateStorage(newTasks);
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

  // ... (previous code)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isAuthenticated ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: 50,
              height: "100%",
              backgroundColor: " #f9f9f9",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 25,
              }}
            >
              Reminders
            </Text>
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                marginTop: 20,
              }}
            >
              <TaskList
                tasks={tasks}
                closeRow={closeRow}
                onDeleteTask={handleDeleteTask}
              />
            </View>

            <View style={{ alignItems: "center", paddingBottom: 20 }}>
              <AddTodo add={handleTaskAdd} />
            </View>

            {isDatePickerVisible ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={currentDateTimePickerMode}
                onChange={handleDateTimeChange}
              />
            ) : null}
          </View>
        ) : (
          <AuthLanding
            onAuthenticationSuccess={() => setIsAuthenticated(true)}
            handleFingerprintAuth={handleFingerprintAuth}
          />
        )}
      </View>
    </View>
  );
}
