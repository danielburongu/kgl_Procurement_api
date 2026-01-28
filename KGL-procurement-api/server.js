const http = require("http");
const fs = require("fs");

const FILE = "data.json";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {

  // GET /kgl/procurement
  if (req.method === "GET" && req.url === "/kgl/procurement") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(readData()));
  }

  // POST /kgl/procurement
  if (req.method === "POST" && req.url === "/kgl/procurement") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const records = readData();

        records.push({ id: Date.now(), ...data });
        writeData(records);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Record added" }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // Invalid route
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

// listen to server
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
