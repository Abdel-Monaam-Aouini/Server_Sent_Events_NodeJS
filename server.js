const http = require("http");

const getStockPrice = (range, base) =>
  (Math.random() * range + base).toFixed(2);

const getTime = () => new Date().toLocaleTimeString();

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  console.log("[INFO] - Client Connected !");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

server.on("request", (req, res) => {
  const intervalId = setInterval(() => {
    res.write(
      `data:{"time": "${getTime()}","aTechStockPrice": "${getStockPrice(2, 20)}","bTechStockPrice": "${getStockPrice(4, 22)}"}`
    );
    res.write("\n\n");
  }, 3000);

  res.on("close", () => {
    console.log("[INFO] - Client Closed connection !");
    clearInterval(intervalId);
    res.end();
  });
});

server.listen(9000, () =>
  console.info("[INFO] - Server listening on port 9000")
);
