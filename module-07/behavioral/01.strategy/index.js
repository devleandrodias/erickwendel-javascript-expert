import ContextStrategy from "./src/base/contextStrategy.js";

import MongodbStrategy from "./src/strategies/mongodbStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString =
  "postgres://devleandrodias:password123@localhost:5432/heroes";

const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);

await postgresContext.connect();

const mongodbConnectionString =
  "mongodb://devleandrodias:passwordadmin@localhost:27017/heroes";

const mongodbContext = new ContextStrategy(
  new MongodbStrategy(mongodbConnectionString)
);

await mongodbContext.connect();

const data = [
  {
    name: "leandrodias",
    type: "transaction",
  },
  {
    name: "mariasilva",
    type: "activityLog",
  },
];

// await postgresContext.create({
//   name: data[0].name,
// });

// console.log(await postgresContext.read());

// await mongodbContext.create({
//   name: data[1].name,
// });

// console.log(await mongodbContext.read());

const constextTypes = {
  activityLog: mongodbContext,
  transaction: postgresContext,
};

for (const { type, name } of data) {
  const context = constextTypes[type];

  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);

  console.log(await context.read());
}
