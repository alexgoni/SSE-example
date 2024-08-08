import { sendNotification } from "./notifications";

export default function handler(req, res) {
  const message = {
    text: "새로운 알림이 도착했습니다!",
    time: new Date().toLocaleTimeString(),
  };
  sendNotification(message);
  res.status(200).json({ message: "Notification sent" });
}
