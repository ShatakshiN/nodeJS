const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('server up and running');

    

});

server.listen(4000);


/*
http - core module 
    functionalities - create http server , make http client req
    createServer function - instantiate http server . - meaning creating an http server obj - this obj knows how to handle a req

    the callback inside the createServer - is the event Listner - for the request event . 
    whenevet the req occur - the callback will execute .  

BTS -
    When a new HTTP request arrives, Node.js automatically creates two objects:
    req → an instance of http.IncomingMessage
      (contains info about the incoming request: URL, method, headers, etc.)

    res → an instance of http.ServerResponse
        (used to send data back to the client: status code, headers, response body)
    
    Then Node.js emits the request event on your server and calls your callback like this:
        server.emit('request', req, res);
    
    means your callback will always receive (req, res) as arguments by default. 


listen  - 
    tells the server to start listening for incoming connections on a specific port (and optionally a host/IP).
    Until you call server.listen(), your server is just sitting there in memory — it’s not accepting any requests.


res.write() = 
    sends a chunk of data to the client (the browser) as part of the HTTP response without ending the response yet.

 */