InjectHttpInterceptor();

import http from "http";

import { InjectHttpInterceptor } from "./../index.js";

// curl -i localhost:3000

function handleRequest(request, response) {
  // response.setHeader("X-Instrumented-By", "Leandro Dias");
  response.end("Hello World!");
}

const server = http.createServer(handleRequest);

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at ${server.address().port}`);
});
