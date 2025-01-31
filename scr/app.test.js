const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

describe("Book api", () => {
  it("It should retive book records", async () => {
    const response = await request.get("/api/v1/books");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Book details recieve successfully.");
  });
});
