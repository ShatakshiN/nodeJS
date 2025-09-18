const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('server up and running');
    res.setHeader('Content-Type', 'text/html');
    res.write('<body>hello from the server!</body>');
    res.end();
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

res.end() = 
    does 3 things  -
        1. send optional ending data  - res.end('the end') // this will be rendered at the end 
        2. flush the remaining data - 
            buffered part of the res will be send before the ending the response cycle. 
            here buffered means - Node.js may temporarily hold (store) some data in memory before actually sending it over the network.
            here , The headers (Content-Type) are not immediately sent the moment you call res.setHeader().
            Node.js keeps them in memory (this is called a buffer) until it actually needs to send the response.

        3. ending the respnse cycle - The browser knows “Okay, no more data is coming. I can render this page fully now.”

 */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



