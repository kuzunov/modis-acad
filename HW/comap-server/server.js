const express = require('express');
const {MongoClient} = require('mongodb');
const { events } = require('./models/events');
const Event = require('./models/events');
const app = express();

async function main() {
	const uri = "mongodb+srv://lawldewm:y7bdlf1yWKrOMobJ@mmcourse.n82qrxt.mongodb.net/CoMaAP?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        app.listen(4000);
     
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }
}
main().catch(console.error);
app.get('/add-event',(req,res)=> {
    const event = new Event({
        name:"works?",
        description:"works!",
        poster:"works!!!",
        date:"now"
    });
    event.save().then((result)=>{
        res.send(result);
    }).catch((err)=>{console.log(err)});
})
