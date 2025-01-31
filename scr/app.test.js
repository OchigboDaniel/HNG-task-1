const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

describe("Book api", () => {
  it("It should add book details to database", async () => {
    const response = await request.post("/books").send({
        title: "Test Book",
        author: "Test Author",
        genre: "Test Genre"
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Book successfully added");
  });
});
