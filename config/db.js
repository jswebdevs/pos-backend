const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.fcornmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let superTeamCollection;

const connectToDatabase = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");

    const database = client.db("webLasserPos");
    superTeamCollection = database.collection("teamMembers");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    throw err;
  }
};

const getSuperTeamCollection = () => superTeamCollection;

module.exports = {
  connectToDatabase,
  getSuperTeamCollection,
};
