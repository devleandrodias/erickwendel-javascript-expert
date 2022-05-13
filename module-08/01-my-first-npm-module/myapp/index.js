// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";

import FluentSQLBuilder from "@devleandrodias/fluentsql";

import database from "./database/data.json" assert { type: "json" };

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(["name"])
  .limit(3)
  .build();

console.log({ result });
