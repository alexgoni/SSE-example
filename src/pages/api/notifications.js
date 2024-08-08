let clients = new Map();

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Content-Encoding", "none");

  res.flushHeaders();

  const clientId = Date.now();
  clients.set(clientId, res);

  req.on("close", () => {
    clients.delete(clientId);
  });
}

export function sendNotification(message) {
  clients.forEach((client, clientId) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
}
