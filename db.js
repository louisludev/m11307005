// db.js
const mongoose = require("mongoose");

// 設定資料庫連線
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("連線錯誤: ", err);
});

db.once("open", () => {
  console.log("成功連接到 MongoDB 資料庫");
});

// 定義資料模型
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

// 導出資料模型
module.exports = Item;
