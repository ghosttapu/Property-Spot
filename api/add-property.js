
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://ghostthewarrior3:zxcvbnm@cluster0.u6eckyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri,
  {serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationError: true
  }}
);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export function GET(request) {
  run().catch(console.dir);
  return new Response('Hello from Vercel!');
} 