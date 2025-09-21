const { MongoClient } = require("mongodb");
const URL =
  "mongodb+srv://vikashKumar:Vikash1234@namastenode.hdioqxx.mongodb.net/";

const client = new MongoClient(URL);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("test");

//   const insertResult = await collection.insertMany([{name:"xyz2"},{name:"ldf2"},{house:"lsfj3"}]);
//   console.log("Inserted documents =>", insertResult);

//   const finalResult = await collection.find({}).toArray();
//   console.log("found document => ", finalResult);

const result=await collection.find({name:"vikashKumar"}).toArray();
console.log("found document" ,result)

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
