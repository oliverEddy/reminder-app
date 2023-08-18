import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import TodoItem from "./components/TodoItem";
import TodoItemButtons from "./components/TodoItemButtons";
import AddTodo from "./components/AddTodo";
import { getStorage, updateStorage } from "./api/localStorage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimePickerMode, setDateTimePickerMode] = useState("date");
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = (dateTime) => {
    const newTasks = [...tasks];
    newTasks.push({
      name: taskName,
      timestamp: dateTime.toString(),
      key: new Date().getTime().toString(),
    });

    setTasks(newTasks);
    setDateTimePickerMode("date");
  };

  const datePickerMode = (currentMode) => {
    setShowDatePicker(true);
    setDateTimePickerMode(currentMode);
  };

  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    console.warn("app mounted");
    return () => {
      isMounted = false;
    };
  }, []);

  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
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
        <AddTodo
          add={(name) => {
            setTaskName(name);
            setSelectedDate(new Date());
            setShowDatePicker(true);
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <SwipeListView
            data={tasks}
            renderItem={TodoItem}
            renderHiddenItem={(data, rowMap) =>
              TodoItemButtons(data, rowMap, (rowMap, deleteThis) => {
                closeRow(rowMap, deleteThis);
                const newTasks = [...tasks];
                const index = newTasks.findIndex(
                  (task) => task.key === deleteThis
                );
                newTasks.splice(index, 1);
                setTasks(newTasks);
              })
            }
            rightOpenValue={-130}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        </View>
      </View>

      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          // @ts-ignore
          mode={dateTimePickerMode}
          onChange={(event, dateString) => {
            setShowDatePicker(false);
            if (dateString) {
              if (dateTimePickerMode === "date") {
                const date = new Date(dateString) || new Date();
                setSelectedDate(date);
                setDateTimePickerMode("time");
                setShowDatePicker(true);
              } else if (dateTimePickerMode === "time") {
                const time = new Date(dateString) || new Date();
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const seconds = 0;
                const newDate = new Date(selectedDate);
                newDate.setHours(hours, minutes, seconds);
                setSelectedDate(newDate);
                addTask(new Date());
              }
            } else {
              setDateTimePickerMode("date");
            }
          }}
        />
      ) : null}
    </View>
  );
}
