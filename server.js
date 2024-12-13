const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // 讓 Express 解析 JSON 資料

let items = [
  { id: 1, name: "Yoshiko Stroman", description: "Description 1" },
  { id: 2, name: "Jevon Faker", description: "Description 2" },
  { id: 3, name: "Cleta Lemke", description: "Description 3" },
];

// 取得所有資料
app.get("/api/items", (req, res) => {
  res.json(items);
});

// 新增資料
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 編輯資料
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const itemIndex = items.findIndex((item) => item.id == id);
  if (itemIndex !== -1) {
    items[itemIndex] = { id: Number(id), name, description };
    res.json(items[itemIndex]);
  } else {
    res.status(404).send("Item not found");
  }
});

// 刪除資料
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.status(204).send();
});

// 啟動伺服器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
