import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "reminder-list";

export const updateStorage = async (tasks) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to storage:", error);
  }
};

export const getStorage = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error retrieving tasks from storage:", error);
    return [];
  }
};
