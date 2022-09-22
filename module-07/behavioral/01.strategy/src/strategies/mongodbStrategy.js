import Mongodb from "mongodb";

export default class MongodbStrategy {
  #instance;
  constructor(connectionString) {
    const { pathname: dbName } = new URL(connectionString);

    this.db = dbName.replace(/\W/, "");
    this.collection = "warriors";
    this.connectionString = connectionString.replace(dbName, "");
  }

  async connect() {
    const client = new Mongodb.MongoClient(this.connectionString, {
      useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db(this.db).collection(this.collection);

    this.#instance = db;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }

  async read(item) {
    return this.#instance.find(item).toArray();
  }
}
