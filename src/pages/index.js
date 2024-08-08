import { useEffect, useState } from "react";

export default function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/notifications");

    eventSource.addEventListener("message", (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const pushNotification = async () => {
    try {
      const response = await fetch("/api/trigger", { method: "POST" });
      const result = await response.json();
    } catch (error) {
      console.error("Error triggering notification:", error);
    }
  };

  return (
    <div>
      <h1>실시간 알림</h1>
      <button onClick={pushNotification}>알림 푸시</button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification.text} - {notification.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
