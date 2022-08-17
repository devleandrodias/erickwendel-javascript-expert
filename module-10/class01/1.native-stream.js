// process.stdin.pipe(process.stdout)
//   .on('data', (data) => { console.log(data.toString()) })
//   .on('error', (err) => { console.log(err.toString()) })
//   .on('end', _ => { console.log('end...') })
//   .on('close', _ => { console.log('close...') });

// Terminal 1
// node -e "process.stdin.pipe(require('net').connect(1338))"

// Terminal 2
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"


// node -e "process.stdout.write(crypto.randomBytes(1e9))" > bigfile

import http from 'http';
import { createReadStream, readFileSync } from 'fs';

http.createServer((req, res) => {
  // BAD
  // const file = readFileSync('bigfile').toString();
  // res.write(file)
  // res.end()

  // GOOD
  createReadStream('bigfile').pipe(res);

}).listen(4000, () => {
  console.log('server started');
})

// curl localhost:4000 -o outout.txt