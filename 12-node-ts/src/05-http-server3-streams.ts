import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
const HOSTNAME = 'localhost';
const PORT = 9000;

const todoList = [
    {id:1,body:'tododo'},
    {id:2,body:'tododosdfg'},
    {id:3,body:'toasddodo'},
];

let nextId = 4;

const server = http.createServer((req:http.IncomingMessage,res:http.ServerResponse)=>{
    var stream = fs.createReadStream(path.join(__dirname,'../public/index.html'));
    stream.pipe(res);
})

server.listen(PORT,HOSTNAME, () => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
})

server.on('error',err=>{
    console.log(`Server Error: ${err}`)
})