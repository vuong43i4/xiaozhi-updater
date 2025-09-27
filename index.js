import express from "express";

const app = express();
const port = process.env.PORT || 10000;

// Middleware đọc JSON
app.use(express.json());

// Bộ nhớ tạm để lưu yêu cầu
const requests = [];

// Route nhận dữ liệu từ Google Form
app.post("/update", (req, res) => {
  const { timestamp, code, email } = req.body;

  if (!code || !email) {
    return res.status(400).json({ error: "Thiếu dữ liệu: code hoặc email" });
  }

  const newRequest = {
    timestamp: timestamp || new Date().toISOString(),
    code,
    email
  };

  requests.push(newRequest);

  console.log("📥 Nhận yêu cầu mới:", newRequest);

  res.json({ message: "✅ Yêu cầu đã được ghi nhận", request: newRequest });
});

// Route hiển thị danh sách yêu cầu
app.get("/requests", (req, res) => {
  let html = "<h2>Danh sách yêu cầu cập nhật</h2>";
  if (requests.length === 0) {
    html += "<p>Chưa có yêu cầu nào.</p>";
  } else {
    html += "<ul>";
    for (const r of requests) {
      html += `<li>
        <b>Thời gian:</b> ${r.timestamp} <br>
        <b>6 số:</b> ${r.code} <br>
        <b>Email:</b> ${r.email}
      </li><hr>`;
    }
    html += "</ul>";
  }
  res.send(html);
});

// Trang chính
app.get("/", (req, res) => {
  res.send("<h1>🚀 Xiaozhi Updater đang chạy!</h1><p>Đi đến <a href='/requests'>/requests</a> để xem yêu cầu.</p>");
});

// Khởi động server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
