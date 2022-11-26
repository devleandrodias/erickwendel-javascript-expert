import { createServer } from "http";
import { randomBytes } from "crypto";

import Events from "events";

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

function onData() {
  getBytes();
  const items = [];
  setInterval(function myInterval() {
    items.push(Date.now());
  });
}

myEvent.on("data", onData);

createServer(function handler(request, response) {
  myEvent.emit("ok");
  response.end("OK");
}).listen(5000, () => {
  console.log("Running at 5000");
});
