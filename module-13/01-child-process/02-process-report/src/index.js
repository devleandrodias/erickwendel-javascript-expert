import { pipeline } from "stream/promises";
import { Writable } from "stream";
import { fork } from "child_process";
import { createReadStream } from "fs";
import csvtojson from "csvtojson";

const database = "./data/All_Pokemon.csv";
const backgroundTaskFile = "./src/backgroundTask.js";

const PROCCESS_COUNT = 30;
const replications = [];

const processes = new Map();

for (let index = 0; index < PROCCESS_COUNT; index++) {
  const child = fork(backgroundTaskFile, [database]);

  child.on("exit", () => {
    console.log(`Process ${child.pid} exited`);
    processes.delete(child.pid);
  });

  child.on("error", (error) => {
    console.log(`Process ${child.pid} has an error`, error);
    process.exit(1);
  });

  child.on("message", (msg) => {
    // work around para multiprocessamento
    if (replications.includes(msg)) return;
    console.log(`${msg} is replicated`);
    replications.push(msg);
  });

  // child.send("hello world");
  processes.set(child.pid, child);
}

function roundRoubin(array, index = 0) {
  return function () {
    if (index >= array.length) index = 0;
    return array[index++];
  };
}

// Poll de conexoes, load balancer
const getProcess = roundRoubin([...processes.values()]);
// console.log("process", getProcess().pid);

// for (let index = 0; index < 100; index++) {
//   console.count(getProcess().pid);
// }

console.log(`starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, enc, cb) {
      const chosenProcess = getProcess();
      chosenProcess.send(JSON.parse(chunk));
      cb();
    },
  })
);
