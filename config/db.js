const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.fcornmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    throw err;
  }
};

const jobcollections = client.db("jobPortal");
const jobs = jobcollections.collection("jobs");
const jobApplication = jobcollections.collection("jobApplication");

module.exports = {
  connectToDatabase,
  jobs,
  jobApplication,
};
