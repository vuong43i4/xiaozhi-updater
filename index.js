// index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API nhận dữ liệu từ Google Form
app.post("/update", async (req, res) => {
  try {
    const userData = req.body;

    console.log("📩 Dữ liệu nhận được:", userData);

    // 🔹 Đây là chỗ bạn sẽ thêm code Puppeteer
    // Ví dụ: login vào Xiaozhi và thay đổi config
    // await updateXiaozhiConfig(userData);

    res.json({ status: "ok", received: userData });
  } catch (err) {
    console.error("❌ Lỗi:", err);
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Server Render đang chạy!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
