let count = 1;
const ws = require('nodejs-websocket');
let timer = null;
const server = ws.createServer(connect => {
  connect.on("text", data => {
    // 收到数据
    console.log("received: " + data);
    // 发送数据
    connect.sendText(data);
    timer = setInterval(() => {
      connect.sendText(`${count *= 9}`);
    }, 500)
  });
  connect.on("close", () => {
    count = 1;
    clearInterval(timer);
    console.log("connection closed!");
  });
  connect.on("connected", () => {
    console.log("connection connected!");
  });
  connect.on('error', (reason) => {
    count = 1;
  });
});

server.listen('13000', () => {
  console.log("websocket server start success!");
});