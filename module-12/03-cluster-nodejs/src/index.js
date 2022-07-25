import os from 'os';
import cluster from 'cluster';
import { initializeServer } from './server.js';


(() => {
  // Se não for o processo main, o orquestrador ele pode criar novas cópias

  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }

  const cpusNumber = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server on ${cpusNumber} CPUs`);

  for (let i = 0; i < cpusNumber; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed. Starting a new worker...`);
      cluster.fork();
    }
  })
})()