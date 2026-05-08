const { MongoClient, ObjectId } = require('mongodb'); 
const uri = 'mongodb+srv://mil10:WiLakgat2PZV0yrO@cluster0.81dwyib.mongodb.net/?appName=Cluster0'; 
const client = new MongoClient(uri); 

async function run() { 
  await client.connect(); 
  const db = client.db('mile10base'); 
  await db.collection('mile10baseC').updateOne(
    {_id: new ObjectId('69f8b35bb87403e484e5f949')}, 
    { $set: {
        thumbnailUrl: 'https://p.turbosquid.com/ts-thumb/MV/5AhRTG/7z/sword_c1/png/1673475115/1920x1080/fit_q87/162f9fddd7b912cb99683a9f93e3e4381b7a25b1/sword_c1.jpg', 
        description: 'A beautifully crafted medieval broadsword.', 
        category: 'Weapons'
      }
    }
  ); 
  console.log('Fixed Medieval Broadsword'); 
  await client.close(); 
} 
run().catch(console.dir);
