import {
  setNotificationHandler,
  scheduleNotificationAsync,
} from "expo-notifications";

export const setupNotifications = () => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export const scheduleNotification = (dateTime, title, body) => {
  const trigger = new Date(dateTime);
  scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
};
