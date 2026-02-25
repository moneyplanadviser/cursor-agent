import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

interface Article {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

const articles: Article[] = [];
let nextId = 1;

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "cursor-agent API is running" });
});

app.get("/api/articles", (_req: Request, res: Response) => {
  res.json(articles);
});

app.get("/api/articles/:id", (req: Request, res: Response) => {
  const article = articles.find((a) => a.id === Number(req.params.id));
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(article);
});

app.post("/api/articles", (req: Request, res: Response) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400).json({ error: "title and body are required" });
    return;
  }
  const article: Article = {
    id: nextId++,
    title,
    body,
    createdAt: new Date().toISOString(),
  };
  articles.push(article);
  res.status(201).json(article);
});

app.delete("/api/articles/:id", (req: Request, res: Response) => {
  const index = articles.findIndex((a) => a.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  const deleted = articles.splice(index, 1)[0];
  res.json(deleted);
});

export default app;
