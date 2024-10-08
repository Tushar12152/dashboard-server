const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5005
require('dotenv').config()


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgzt8q2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const userCollection = client.db("dashboard-db").collection("users");
    const transectionCollection = client.db("dashboard-db").collection("transections");


    app.post('/users', async (req, res) => {
      const user = req.body;
      //  console.log(user)   
      const result = await userCollection.insertOne(user)
      res.send(result)

    })




    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.patch('/users/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const user = req.body;
      // console.log(user);

      const updatedDoc = {
        $set: {

          Role:user?.Role
          }
      }

      const result = await userCollection.updateOne(filter, updatedDoc, options)
      res.send(result)

    })



    // transection APIS

    app.post('/transections',async (req,res)=>{
        const transection= req.body
        const result=await transectionCollection.insertOne(transection)
        res.send(result)
    })





    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('dashboard-server is running....')
})



app.listen(port, () => {
  console.log(`This server is going on port : ${port}`)
})