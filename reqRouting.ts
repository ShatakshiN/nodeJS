import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
  if (req.url === "/home") {
     fs.readFile("msg.txt", "utf-8", (err:NodeJS.ErrnoException | null, data:string) => {
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
    const body:Buffer[] = [];
    // for every incoming data chunk - initially when new data chunk comes until they finish 
    req.on('data', (chunk)=>{
      console.log(chunk)
      body.push(chunk);

    })

    //Fires when no more data is left.- when all the chunks will be pushed to the body arr then to interact with them 
    req.on('end', ()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1] 
      if(message){
          fs.writeFileSync("msg.txt", message); 
      }else{
        console.log('no message was provided!!!')
      }
   
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

// stream - is a ongoing proccess where data comes in chunks , not all at once  - eg youtube video it doesnt load in one go ; progresses eventually 
// each chunk is the binary data (not in JSON or string)
//If we want to reconstruct the whole message, we must collect those chunks until the stream finishes.
// Buffers give us a way to temporarily hold that data safely and efficiently. - it lets you capture, store, and work with data coming from a stream before you turn it into something more readable like a string


