import { MongoClient } from "mongodb";
import { Post } from "./model/post";

const dburl = 'mongodb://localhost:27017';
const database = 'ts-academy-2022';

MongoClient.connect(dburl).then( async (con) => {7
    try {
    const db = con.db(database);
    const posts = await db.collection('posts').find().toArray();
    console.log(posts);
    try{
        db.collection<Post>('posts')}
    catch (e) {

    }
    } catch(error) {
        console.log(error)
    }
});
