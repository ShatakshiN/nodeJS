import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    fs.readFile("msg.txt", "utf-8", (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        res.write("<h1>Welcome to Home Page</h1>");
        res.write("<p>No message found</p>");
      } else {
        res.write("<h1>Welcome to Home Page</h1>");
        res.write(`<p>Last message: ${data}</p>`);
      }
      return res.end();
    });
    return;
  }

  if (req.url === "/form") {
    res.write("<h1>ENTER MESSAGE</h1>");
    res.write(`
      <form method="POST" action="/msg">
        <input type="text" name="msg">
        <button type="submit">Submit</button>
      </form>
    `);
    return res.end();
  }

  if (req.url === "/msg" && req.method === "POST") {
    const body: Buffer[] = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      if (message) {
        try {
          await fs.promises.writeFile("msg.txt", message);
          console.log("Message saved successfully!");
        } catch (err) {
          console.error("Failed to save message:", err);
        }
      } else {
        console.log("No message was provided!!!");
      }

      // Redirect AFTER writing the file
      res.statusCode = 302;
      res.setHeader("Location", "/home");
      return res.end();
    });
  }
});

server.listen(4000);
