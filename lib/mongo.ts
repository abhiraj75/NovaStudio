import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

const globalForMongo = globalThis as unknown as { mongo: MongoClient };

const client = globalForMongo.mongo || new MongoClient(uri);

if (process.env.NODE_ENV !== "production") globalForMongo.mongo = client;

const db = client.db("novastudio");

export { client, db };
