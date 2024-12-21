// /lib/mongodb.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000,
};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(error => {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(error => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });
}

export default clientPromise;
