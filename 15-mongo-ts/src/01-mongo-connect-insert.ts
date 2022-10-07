import {MongoClient} from 'mongodb';
import {Post} from './model/post';

const dbUrl = 'mongodb://127.0.0.1:27017';
const database = 'ts-academy-2022';

MongoClient.connect(dbUrl).then(async (con) => {
    const db = con.db(database);
    try {
       const {acknowledged,insertedId} =  await db.collection<Post>('posts').insertOne(
            new Post("l1","1","1","1" ,'"', "1",["2"],["3"])
        )
        const posts = await db.collection<Post>('posts').find().toArray();
        console.log(posts)
        con.close();
    } catch(err){console.log(err)};
})