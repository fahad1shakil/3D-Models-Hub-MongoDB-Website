const express = require('express')
const app = express()
const port = 3000
//! Mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// corse
const cors = require('cors')
// cors app
app.use(cors())
// kono client eh jonne post kori jekhane jeson file gula permission dibe 
app.use(express.json())

// Prevent browser caching of API responses
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
app.get('/', (req, res) => {
  res.send('FH Shakidsdlss')
})

app.get('/he', (req, res) => {
  res.send('LOLOLOL')
})

// ! MONGODB CONNECTION
const uri = "mongodb+srv://mil10:WiLakgat2PZV0yrO@cluster0.81dwyib.mongodb.net/?appName=Cluster0";

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
    await client.connect();
    
  // !eikhane api lekhbo
// eikhane bole dite hobe kon database moddhe kon collection moddeha ache sta bolte dite hbe 
const db = client.db('mile10base')
const modelCollection = db.collection('mile10baseC')
const downloadCollection = db.collection('downloads')

  //  data niye asbo jar jonne korte hbe 
  // 1. find (sob data anne )
  // 2. findOne ( ekta data ane)
  
  // link = http://localhost:3000/baseC 


  //async mane holo jodi data niye asar somoy kono problem hoy tahole seta handle korte parbe 
  
  app.get('/baseC', async(req, res)=>{
     const result =await modelCollection.find().toArray() //promise
  //  await mane holo jodi data niye asar somoy kono problem hoy tahole seta handle korte parbe

    // toArray mane holo je data gula asbe ta array te convert kore dibe
    // console.log(result)
      // ja show korbe
    res.send(result)
  })
  
  app.get('/search', async (req, res) => {
    const searchText = req.query.search;
    const query = {
      name: { $regex: searchText, $options: 'i' }
    };
    const result = await modelCollection.find(query).toArray();
    res.send(result);
  });
  
  app.get('/baseC/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await modelCollection.findOne(query);
    res.send({ result });
  });

  app.put('/baseC/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedModel = req.body;
    
    const updateDoc = {
      $set: {
        ...updatedModel
      },
    };
    const result = await modelCollection.updateOne(filter, updateDoc);
    res.send(result);
  });

  app.post('/baseC', async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await modelCollection.insertOne(data);
    res.send(result);
  });

  app.get('/latest-models', async (req, res) => {
    const result = await modelCollection.find().sort({ created_at: -1 }).limit(6).toArray();
    res.send(result);
  });

  app.get('/my-models', async (req, res) => {
    const email = req.query.email;
    const query = { created_by: email };
    const result = await modelCollection.find(query).toArray();
    res.send(result);
  });

  app.get('/my-downloads', async (req, res) => {
    const email = req.query.email;
    const query = { downloaded_by: email };
    const result = await downloadCollection.find(query).toArray();
    res.send(result);
  });

  app.post('/downloads/:id', async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    await modelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { downloads: 1 } }
    );
    const result = await downloadCollection.insertOne(data);
    res.send(result);
  });

  app.delete('/models/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await modelCollection.deleteOne(query);
    res.send(result);
  });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

//! data baje rakhte lege API bante hbe
// 1. server = post bethod
 // 2. mongoDb = insertMany / insertOne
    // - ekbar ekta data rakhte = insertOne
    // 

    //! showing ID in HOME PAGE 



// server ta kon port eh calu hobe tai "listen" use kore 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
