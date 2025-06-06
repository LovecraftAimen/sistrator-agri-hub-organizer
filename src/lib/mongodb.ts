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

// Database operations for beneficiaries
export async function getBeneficiarios() {
  const collection = await getCollection('beneficiarios');
  return collection.find({}).toArray();
}

export async function addBeneficiario(beneficiario: any) {
  const collection = await getCollection('beneficiarios');
  return collection.insertOne(beneficiario);
}

export async function updateBeneficiario(id: string, beneficiario: any) {
  const collection = await getCollection('beneficiarios');
  return collection.updateOne({ _id: id }, { $set: beneficiario });
}

export async function deleteBeneficiario(id: string) {
  const collection = await getCollection('beneficiarios');
  return collection.deleteOne({ _id: id });
}

// Database operations for services
export async function getServicos() {
  const collection = await getCollection('servicos');
  return collection.find({}).toArray();
}

export async function addServico(servico: any) {
  const collection = await getCollection('servicos');
  return collection.insertOne(servico);
}

export async function updateServico(id: string, servico: any) {
  const collection = await getCollection('servicos');
  return collection.updateOne({ _id: id }, { $set: servico });
}

export async function deleteServico(id: string) {
  const collection = await getCollection('servicos');
  return collection.deleteOne({ _id: id });
}

// Database operations for tratoristas
export async function getTratoristas() {
  const collection = await getCollection('tratoristas');
  return collection.find({}).toArray();
}

export async function addTratorista(tratorista: any) {
  const collection = await getCollection('tratoristas');
  return collection.insertOne(tratorista);
}

export async function updateTratorista(id: string, tratorista: any) {
  const collection = await getCollection('tratoristas');
  return collection.updateOne({ _id: id }, { $set: tratorista });
}

export async function deleteTratorista(id: string) {
  const collection = await getCollection('tratoristas');
  return collection.deleteOne({ _id: id });
}