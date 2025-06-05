import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://yanhellen2024:Yand80744259860!@sistrator.0mlcm8y.mongodb.net/?retryWrites=true&w=majority&appName=Sistrator";

let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  return client;
}

export async function getCollection(collectionName: string) {
  const client = await connectToDatabase();
  return client.db("sistrator").collection(collectionName);
}