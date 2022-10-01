import * as http from 'http';
import * as url from 'url';
import * as fs from 'node:fs/promises';

const HOSTNAME = 'localhost';
const PORT = 36000;

const mainListener = (req:http.IncomingMessage,res:http.ServerResponse) => {
    const reqUrlPath = url.parse(req.url).pathname;
    if (reqUrlPath.startsWith('/api/users')) {
        if (reqUrlPath==="/api/users" && req.method==="GET") {
            usersApiCollectionResponse(req,res);
        }
    } else {
       respondWithError(res,404,"This does not exist.")
    }
}

const usersApiCollectionResponse = async (req,res) => {
    if (req.method==="GET") {
        try {
            let users = await getFromUsers();
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(users))
        } catch (err) {
            console.log(err);
            res.writeHead(500,{'Content-Type':'application/json'});
            res.end(JSON.stringify({'message':err.message}))
        }
    }
    else if (req.method ==="POST") {
        //POST
    } else {
        res.writeHead(405,{'Content-Type':'application/json'});
        res.end(JSON.stringify({"message":"Invalid request method."}))}
    }

const usersApiResourceResponse = async () => {};
const getFromUsers = async (id?:number) =>{
    let users = await fs.readFile('./db.json',"utf-8");
    return JSON.parse(users);
}
const respondWithError = (res:http.ServerResponse,status:number, message:string, err?:Error) => {
    res.writeHead(status,{'Content-Type':'application/json'});
    res.end(JSON.stringify({status:status,message:message}));
}


const server = http.createServer(mainListener);


server.listen(PORT,HOSTNAME, ()=> {
    console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
})
server.on('error',err=>{
    console.log(`Server Error: ${err}`)
})