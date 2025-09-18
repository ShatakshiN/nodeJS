const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home Page</h1>");
    return res.end();
  } else if (req.url === "/about-us") {
    res.write("<h1>About Us</h1>");
    res.write('<form method= post > <input type = "text" ><button type= "submit">submit</button></form>')
    return res.end(); 
  }
});

server.listen(4000);