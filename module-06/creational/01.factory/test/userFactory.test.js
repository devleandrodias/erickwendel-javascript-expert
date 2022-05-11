const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

(async () => {
  const dbData = [{ name: "Maria", name: "João" }];

  class MockDatabase {
    connect = () => this;
    find = async (query) => dbData;
  }

  rewiremock(() => require("./../src/util/database")).with(MockDatabase);

  {
    const expected = [{ name: "MARIA", name: "JOÃO" }];

    rewiremock.enable();

    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);

    rewiremock.disable();
  }
  {
    const expected = [{ name: "LEANDRO" }];
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
