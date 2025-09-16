const http = require('http');

const server = http.createServer((req,res,next)=>{
    console.log('server up and running')
});

server.listen(4000);