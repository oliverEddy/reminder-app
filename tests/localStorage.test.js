import { updateStorage, getStorage } from "../api/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");

describe("localStorage", () => {
  afterEach(() => {
    AsyncStorage.clear();
  });

  it("saves tasks to storage", async () => {
    const tasks = [
      { name: "Task 1", dueDateTimestamp: "12341234", key: "1" },
      { name: "Task 2", dueDateTimestamp: "35234234", key: "2" },
    ];

    await updateStorage(tasks);

    const storedTasks = await AsyncStorage.getItem("reminder-list");
    expect(JSON.parse(storedTasks)).toEqual(tasks);
  });

  it("retrieves tasks from storage", async () => {
    const tasks = [
      { name: "Task 1", dueDateTimestamp: "12341234", key: "1" },
      { name: "Task 2", dueDateTimestamp: "35234234", key: "2" },
    ];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(tasks));

    const retrievedTasks = await getStorage();
    expect(retrievedTasks).toEqual(tasks);
  });

  it("removes tasks from storage when deleted", async () => {
    const initialTasks = [
      { name: "Task 1", dueDateTimestamp: "12341234", key: "1" },
      { name: "Task 2", dueDateTimestamp: "35234234", key: "2" },
    ];
    AsyncStorage.setItem("reminder-list", JSON.stringify(initialTasks));

    const deletedTaskKey = "1";
    const remainingTasks = initialTasks.filter(
      (task) => task.key !== deletedTaskKey
    );

    await updateStorage(remainingTasks);

    const storedTasks = await AsyncStorage.getItem("reminder-list");
    expect(JSON.parse(storedTasks)).toEqual(
      expect.arrayContaining(remainingTasks)
    );
  });
});
