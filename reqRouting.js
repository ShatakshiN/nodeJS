const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home Page</h1>");
    return res.end();
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
    const body = [];
    // for every incoming data chunk - initially when new data chunk comes 
    req.on('data', (chunk)=>{
      console.log(chunk)
      body.push(chunk);

    })

    //Fires when no more data is left.- when all the chunks will be pushed to the body arr then to interact with them 
    req.on('end', ()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1]
      fs.writeFileSync("msg.txt", message); 
    })

    
    res.statusCode = 302; 
    res.setHeader("Location", "/home");
    return res.end();
  }
});

server.listen(4000);



// here  return res.end()  - this will end the callback function altogether once the condition matches
//Without return, your function keeps going and may run into logic errors.


//by default, req (the incoming request object) is a readable stream in Node.js.


