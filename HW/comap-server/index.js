const express = require('express');
const {MongoClient} = require('mongodb');
const { events } = require('./models/events');
const Event = require('./models/events');
const app = express();
	const uri = "mongodb+srv://lawldewm:y7bdlf1yWKrOMobJ@mmcourse.n82qrxt.mongodb.net/CoMaAP?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        app.listen(4000);
        app.get('/add-event',(req,res)=> {
            const event = new Event({
                name:"works?",
                description:"works!",
                poster:"works!!!"
            });
            event.save().then((result)=>{
                res.send(result);
            }).catch((err)=>{console.log(err)});
        })
        
     
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }

