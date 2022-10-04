import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
const HOSTNAME = 'localhost';
const PORT = 9000;

const todoList = [
    {id:1,body:'tododo'},
    {id:2,body:'tododosdfg'},
    {id:3,body:'toasddodo'},
];

let nextId = 4;

const server = http.createServer((req:http.IncomingMessage,res:http.ServerResponse)=>{
    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');

    if (req.method === 'GET' && url.parse(req.url).pathname==="/api/todos") {
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(todoList));
    } else {
        if (req.method === "GET") {
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({"nope":"nope"}));
        } else if (req.method === "POST") {
            let bodyChunks:Uint8Array[] =[];
            req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', async () => {
                let body = Buffer.concat(bodyChunks).toString();
                console.log(body);
                const newTodo = JSON.parse(body);
                newTodo.id = ++nextId;

                fs.writeFile('todos.json',JSON.stringify(todoList),(err)=>{
                    if (err) {console.log(err); return;} else {
                        res.writeHead(500,{"Content-Type": "application/json"});
                    res.writeHead(201,
                        {'Content-Type':'application/json',
                         'location':`http://${HOSTNAME}:${PORT}/api/todos/${newTodo.id}`
                        });
                    res.end(JSON.stringify(newTodo));}
                });
                
            })
        }
    }
    res.end(`<p>Request for: ${url.parse(req.url).pathname}
    

    ${req.method} :::: ${JSON.stringify(req.headers)}</p>`)
})

server.listen(PORT,HOSTNAME, () => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
})

server.on('error',err=>{
    console.log(`Server Error: ${err}`)
})