import request from "supertest";
import app from "./app";

describe("GET /api", () => {
  it("returns API status message", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("cursor-agent API is running");
  });
});

describe("Articles API", () => {
  it("GET /api/articles returns empty array initially", async () => {
    const res = await request(app).get("/api/articles");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/articles creates a new article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send({ title: "Test Article", body: "Hello World" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      title: "Test Article",
      body: "Hello World",
      createdAt: expect.any(String),
    });
  });

  it("POST /api/articles returns 400 without required fields", async () => {
    const res = await request(app).post("/api/articles").send({ title: "Only title" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("GET /api/articles/:id returns 404 for non-existent article", async () => {
    const res = await request(app).get("/api/articles/9999");
    expect(res.status).toBe(404);
  });

  it("DELETE /api/articles/:id returns 404 for non-existent article", async () => {
    const res = await request(app).delete("/api/articles/9999");
    expect(res.status).toBe(404);
  });
});
