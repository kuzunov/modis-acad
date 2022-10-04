import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { request } from 'http';
import { Router } from 'express';

const HOSTNAME = 'localhost';
const PORT = 9000;

const todoList = [
    {id:1,body:'tododo'},
    {id:2,body:'tododosdfg'},
    {id:3,body:'toasddodo'},
];

let nextId = 4;

const app = express();
app.use(cors({
    origin: "http://localhost",
    methods: ['GET','POST']
}))
app.use(express.json({limit:"10mb"}));
app.use(logger('dev'));
app.use(Router());

app.get('/',(req,res)=>{
    res.send("<h1>Hello from express</h1>");
}).get('/api/todos', (req,res) => {
    res.set({'Content-Type':'application/json',
            "Cache-Control":'no-store, no-cache',
            "Pragma":"no-cache"}).json(todoList);
    
}).get('/api/todos/:id', (req,res)=>{
    res.set({'Content-Type':'application/json'});
    res.json(todoList.find(todo => todo.id === +req.params.id))
})
app.listen(PORT,HOSTNAME, () => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
})

app.on('error',err=>{
    console.log(`Server Error: ${err}`)
})