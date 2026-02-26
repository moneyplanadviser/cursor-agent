"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
const articles = [];
let nextId = 1;
app.get("/api", (_req, res) => {
    res.json({ message: "cursor-agent API is running" });
});
app.get("/api/articles", (_req, res) => {
    res.json(articles);
});
app.get("/api/articles/:id", (req, res) => {
    const article = articles.find((a) => a.id === Number(req.params.id));
    if (!article) {
        res.status(404).json({ error: "Article not found" });
        return;
    }
    res.json(article);
});
app.post("/api/articles", (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400).json({ error: "title and body are required" });
        return;
    }
    const article = {
        id: nextId++,
        title,
        body,
        createdAt: new Date().toISOString(),
    };
    articles.push(article);
    res.status(201).json(article);
});
app.delete("/api/articles/:id", (req, res) => {
    const index = articles.findIndex((a) => a.id === Number(req.params.id));
    if (index === -1) {
        res.status(404).json({ error: "Article not found" });
        return;
    }
    const deleted = articles.splice(index, 1)[0];
    res.json(deleted);
});
exports.default = app;
//# sourceMappingURL=app.js.map