const express = require('express');
const {MongoClient} = require('mongodb')

const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qhwuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const databse = client.db('Booking')
        const hotelsCollection = databse.collection('hotels')


        app.get('/hotels', async(req, res)=>{
            const cursor = hotelsCollection.find();
            const hotels = await cursor.toArray()
            res.send(hotels)
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('Running Server')
})

app.listen(port, ()=>{
    console.log('Running the server on port', port)
})