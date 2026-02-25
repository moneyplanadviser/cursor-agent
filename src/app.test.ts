import request from "supertest";
import app from "./app";

describe("GET /", () => {
  it("returns API status message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("cursor-agent API is running");
  });
});

describe("Articles API", () => {
  it("GET /articles returns empty array initially", async () => {
    const res = await request(app).get("/articles");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /articles creates a new article", async () => {
    const res = await request(app)
      .post("/articles")
      .send({ title: "Test Article", body: "Hello World" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      title: "Test Article",
      body: "Hello World",
      createdAt: expect.any(String),
    });
  });

  it("POST /articles returns 400 without required fields", async () => {
    const res = await request(app).post("/articles").send({ title: "Only title" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("GET /articles/:id returns 404 for non-existent article", async () => {
    const res = await request(app).get("/articles/9999");
    expect(res.status).toBe(404);
  });

  it("DELETE /articles/:id returns 404 for non-existent article", async () => {
    const res = await request(app).delete("/articles/9999");
    expect(res.status).toBe(404);
  });
});
