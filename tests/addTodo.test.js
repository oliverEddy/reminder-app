import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddTodo from "../components/AddTodo";

test('handleAddPress adds task when "Add" button is pressed', () => {
  const addMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(<AddTodo add={addMock} />);

  const input = getByPlaceholderText("Enter task name...");
  const addButton = getByText("Add");

  fireEvent.changeText(input, "New Task");
  fireEvent.press(addButton);

  expect(addMock).toHaveBeenCalledWith("New Task");
});
test("handleAddPress does not add task with empty name", () => {
  const addMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(<AddTodo add={addMock} />);

  const input = getByPlaceholderText("Enter task name...");
  const addButton = getByText("Add");

  fireEvent.changeText(input, "");
  fireEvent.press(addButton);

  expect(addMock).not.toHaveBeenCalled();
});
