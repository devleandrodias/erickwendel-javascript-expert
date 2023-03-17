import { dirname } from "node:path";
import { createServer } from "node:http";
import { Worker } from "node:worker_threads";
import { parse, fileURLToPath } from "node:url";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

// Worker thread sao melhores para trabalhar com CPU e Memoria

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code != 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );
      }

      console.log(`The thread worker ${worker.threadId} exited!`);
    });
  });
}

async function handle(request, response) {
  if (request.url.includes("joinImages")) {
    const {
      query: { background, image },
    } = parse(request.url, true);

    const imageBase64 = await joinImages({
      image,
      background,
    });

    response.writeHead(200, {
      "Content-Type": "text/html",
    });

    return response.end(
      `<img style="width:100%;height:100%;" src="data:image/jpeg;base64,${imageBase64}" />`
    );
  }

  return response.end("ok");
}

createServer(handle).listen(3000, () => {
  console.clear();
  console.info("Server running at 3000");
});
