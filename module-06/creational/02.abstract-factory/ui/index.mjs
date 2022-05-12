import { database } from "../shared/data.mjs";

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  intialize(database) {
    this.table.render(database);
  }
}

(async function main() {
  const path = globalThis.window ? "browser" : "console";

  const { default: ViewFactory } = await import(
    `../plataforms/${path}/index.mjs`
  );

  const app = new Application(new ViewFactory());

  app.intialize(database);
})();
