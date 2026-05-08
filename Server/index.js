require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Prevent browser caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Firebase Admin
const serviceAccount = require("./firebase-adminion.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// MongoDB Connection
const uri = "mongodb+srv://mil10:WiLakgat2PZV0yrO@cluster0.81dwyib.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database Collections
const db = client.db('mile10base')
const modelCollection = db.collection('mile10baseC')
const downloadCollection = db.collection('downloads')

// --- ROUTES (Moved outside run() for Vercel) ---

app.get('/', (req, res) => {
  res.send('Server is running fine!')
})

app.get('/baseC', async(req, res)=>{
  try {
    const result = await modelCollection.find().toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

app.get('/search', async (req, res) => {
  try {
    const searchText = req.query.search;
    const query = {
      name: { $regex: searchText, $options: 'i' }
    };
    const result = await modelCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.get('/baseC/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const query = { _id: new ObjectId(id) };
    const result = await modelCollection.findOne(query);
    res.send({ result });
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.put('/baseC/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const filter = { _id: new ObjectId(id) };
    const updatedModel = req.body;
    const updateDoc = { $set: { ...updatedModel } };
    const result = await modelCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.post('/baseC', async (req, res) => {
  try {
    const data = req.body;
    const result = await modelCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.get('/latest-models', async (req, res) => {
  try {
    const result = await modelCollection.find().sort({ created_at: -1 }).limit(6).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.get('/my-models', async (req, res) => {
  try {
    const email = req.query.email;
    const query = { created_by: email };
    const result = await modelCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.get('/my-downloads', async (req, res) => {
  try {
    const email = req.query.email;
    const query = { downloaded_by: email };
    const result = await downloadCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.post('/downloads/:id', async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    await modelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { downloads: 1 } }
    );
    const result = await downloadCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

app.delete('/models/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const query = { _id: new ObjectId(id) };
    const result = await modelCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
});

// Startup function
async function run() {
  try {
    // await client.connect(); // Optional in newer driver but good to have
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
}

module.exports = app;
