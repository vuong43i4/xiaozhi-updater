import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

let requests = []; // lưu tạm trong RAM

// Route test
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Nhận dữ liệu từ Google Form
app.post("/update", (req, res) => {
  const { data } = req.body;
  const timestamp = new Date().toISOString();

  requests.push({ data, timestamp });
  console.log("📩 New request:", data);

  res.json({ status: "ok", received: data });
});

// Trang hiển thị danh sách yêu cầu
app.get("/requests", (req, res) => {
  let html = `
    <html>
    <head>
      <title>Danh sách yêu cầu</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        button { padding: 5px 10px; margin: 0 2px; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>📋 Danh sách yêu cầu cập nhật</h1>
      <table>
        <tr>
          <th>Thời gian</th>
          <th>Nội dung</th>
          <th>Hành động</th>
        </tr>
        ${requests
          .map(
            (r, i) => `
              <tr>
                <td>${r.timestamp}</td>
                <td>${r.data}</td>
                <td>
                  <button onclick="navigator.clipboard.writeText('${r.data}')">Copy</button>
                  <button onclick="fetch('/delete/${i}', {method: 'POST'}).then(()=>location.reload())">Xóa</button>
                </td>
              </tr>
            `
          )
          .join("")}
      </table>
    </body>
    </html>
  `;
  res.send(html);
});

// API xóa request
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id >= 0 && id < requests.length) {
    requests.splice(id, 1);
  }
  res.json({ status: "ok" });
});

// Render cần chạy port 10000
app.listen(10000, () => {
  console.log("✅ Server running on port 10000");
});
