// DB_USER=bakeryDbUser
// DB_PASSWORD=Opkdqg1qPzfRh8P0

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sn1j5xu.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const itemsCollection = client.db('onlineBakery').collection('cakes');
        const reviewCollection = client.db('onlineBakery').collection('reviews');
        const orderCollection = client.db('onlineBakery').collection('orders');


        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = itemsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        app.get('/limiteditems', async (req, res) => {
            const query = {}
            const cursor = itemsCollection.find(query);
            const limiteditems = await cursor.limit(3).toArray();
            res.send(limiteditems);
        });

        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemsCollection.findOne(query);
            res.send(item);
        })

        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemsCollection.findOne(query);
            res.send(item);
        })
        
        //orders api
        app.post('/orders', async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.get('/orders', async (req, res) => {
            let query = {};

            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });




        // reviews api
        app.get('/reviews', async (req, res) => {
            let query = {};

            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.post('/reviews', async(req,res)=>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        //delete
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })



    }
    finally {

    }

}

run().catch(err => console.error(err));





app.get('/', (req, res) => {
    res.send('bakery server is running');
})

app.listen(port, () => {
    console.log(`bakery server running on ${port}`);
})