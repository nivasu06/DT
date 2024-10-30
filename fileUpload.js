import { MongoClient ,ObjectId} from "mongodb";

const url = "mongodb://localhost:27017";
const dbname = "example";
let client;

async function connect() {
    client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");
}

export function getDatabase() {
    return client.db(dbname);
}

export default connect;
