import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import App from "../App"; // Update this import path as needed

// Mock the expo-local-authentication module
jest.mock("expo-local-authentication", () => ({
  authenticateAsync: jest.fn(),
}));

describe("Fingerprint Authentication", () => {
  it("renders the authentication button initially", () => {
    const { getByText } = render(<App />);
    const authButton = getByText("Authenticate with Fingerprint");
    expect(authButton).toBeTruthy();
  });

  it("sets isAuthenticated to true on successful authentication", async () => {
    // Mock a successful authentication
    const mockSuccess = { success: true };
    require("expo-local-authentication").authenticateAsync.mockResolvedValue(
      mockSuccess
    );

    const { getByText, findByText, queryByText } = render(<App />);
    const authButton = getByText("Authenticate with Fingerprint");

    await act(async () => {
      fireEvent.press(authButton);
      // Wait for authentication to complete
      await findByText("Reminders"); // Assuming this text is rendered after authentication
    });

    await act(async () => {
      // Check if the authentication button is still in the DOM
      const updatedAuthButton = queryByText("Authenticate with Fingerprint");
      expect(updatedAuthButton).toBeNull(); // Button should not be rendered
    });
  });

  it("does not change isAuthenticated on failed authentication", async () => {
    // Mock a failed authentication
    const mockFailure = { success: false };
    require("expo-local-authentication").authenticateAsync.mockResolvedValue(
      mockFailure
    );

    const { getByText, findByText } = render(<App />);
    const authButton = getByText("Authenticate with Fingerprint");
    fireEvent.press(authButton);

    // Wait for authentication to complete
    await findByText("Authenticate with Fingerprint"); // Button should still be rendered

    expect(authButton).toBeTruthy(); // Button should be rendered
  });
});
