import MockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Mock AsyncStorage for testing
jest.mock("@react-native-async-storage/async-storage", () => MockAsyncStorage);
