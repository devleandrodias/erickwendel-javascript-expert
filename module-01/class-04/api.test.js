const supertest = require("supertest");

const { describe, it } = require("mocha");
const { deepStrictEqual, ok } = require("assert");

const app = require("./api");

describe("API Suit Test", () => {
  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await supertest(app).get("/hi").expect(200);
      deepStrictEqual(response.text, "Hello World");
    });
  });

  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);
      deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "LeandroDias",
          password: "Senha@123",
        })
        .expect(200);

      deepStrictEqual(response.text, "Logging has succeeded!");
    });

    it("should unauthorized a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({
          username: "Invalid user",
          password: "Senha@123",
        })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Loggin failed!");
    });
  });
});
