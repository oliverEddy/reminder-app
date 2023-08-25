import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
test("addTask adds task with selected date", () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  const taskNameInput = getByPlaceholderText("Enter task name...");
  const addButton = getByText("Add");

  fireEvent.changeText(taskNameInput, "Test Task");
  fireEvent.press(addButton);

  const mockAddTask = jest.fn();
  const mockSelectedDateTime = "2023-08-27T15:30:00";
  mockAddTask("Test Task", mockSelectedDateTime);

  expect(mockAddTask).toHaveBeenCalledWith("Test Task", mockSelectedDateTime);
});
