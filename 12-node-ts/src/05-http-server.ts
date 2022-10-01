import * as http from 'http';
import * as url from 'url';
const HOSTNAME = 'localhost';
const PORT = 9000;

const server = http.createServer((req:http.IncomingMessage,res:http.ServerResponse)=>{
    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<h1>Hello from nodejs</h1>')
    res.write('<h2>Hello from TS</h2>')
    res.write('<p>Hello from <MOON></p>')
    res.end(`<p>Request for: ${url.parse(req.url).pathname}
    
    ${req.method} :::: ${JSON.stringify(req.headers)}</p>`)
})

server.listen(PORT,HOSTNAME, () => {
    console.log(`Listening on ${PORT} on ${HOSTNAME}`)
})

server.on('error',err=>{
    console.log(`Server Error: ${err}`)
})