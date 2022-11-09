// DB_USER=bakeryDbUser
// DB_PASSWORD=Opkdqg1qPzfRh8P0

const express = require( 'express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sn1j5xu.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const itemsCollection = client.db('onlineBakery').collection('cakes');

        app.get('/items', async(req,res)=>{
            const query ={}
            const cursor = itemsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

    }
    finally{

    }

}

run().catch(err => console.error(err));





app.get('/', (req, res)=>{
    res.send('bakery server is running');
})

app.listen(port,()=>{
    console.log(`bakery server running on ${port}`);
})