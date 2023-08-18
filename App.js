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
    setDateTimePickerMode("date");
  };

  const datePickerMode = (mode) => {
    setDatePickerVisible(true);
    setDateTimePickerMode(mode);
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
            setSelectedDateTime(new Date());
            setDatePickerVisible(true);
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
              TodoItemButtons(data, rowMap, (rowMap, deleteKey) => {
                closeRow(rowMap, deleteKey);
                const newTasks = [...tasks];
                const index = newTasks.findIndex(
                  (task) => task.key === deleteKey
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

      {isDatePickerVisible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          // @ts-ignore
          mode={currentDateTimePickerMode}
          onChange={(event, dateString) => {
            setDatePickerVisible(false);
            if (dateString) {
              if (currentDateTimePickerMode === "date") {
                const date = new Date(dateString) || new Date();
                setSelectedDateTime(date);
                setDateTimePickerMode("time");
                setDatePickerVisible(true);
              } else if (currentDateTimePickerMode === "time") {
                const time = new Date(dateString) || new Date();
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const seconds = 0;
                const newDate = new Date(selectedDateTime);
                newDate.setHours(hours, minutes, seconds);
                setSelectedDateTime(newDate);
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
