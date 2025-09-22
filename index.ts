import http from "http";



const PORT = 4000;
const messages: string[] = [];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  
  if (req.url === "/home" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const message = parsed.message;
        if (!message || typeof message !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Message is required" }));
        }

        messages.push(message);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message, index: messages.length - 1 }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  
  else if (req.url === "/home" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ messages }));
  }

  else if (req.url?.startsWith("/home/") && req.method === "DELETE") {
    const index = Number(req.url.split("/")[2]);
    if (isNaN(index) || index < 0 || index >= messages.length) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Message not found" }));
    }

    messages.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true }));
  }

  
  else if (req.url?.startsWith("/home/") && req.method === "PUT") {
    const index = Number(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const newMessage = parsed.message;

        if (isNaN(index) || index < 0 || index >= messages.length) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Message not found" }));
        }

        messages[index] = newMessage;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: newMessage, index }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(4000);
