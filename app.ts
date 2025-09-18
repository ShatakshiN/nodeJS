import http from 'http'; 

const server = http.createServer((req,res)=>{
    console.log('server up and running')
});

server.listen(4000);


// require is not recognized – If tsconfig.json has "module": "ESNext" or "moduleResolution": "node16",
//  then require is not allowed unless you explicitly enable CommonJS interop.