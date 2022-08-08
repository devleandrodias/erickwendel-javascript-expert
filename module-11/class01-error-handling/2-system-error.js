import timers from 'timers/promises';

const timersAsync = timers.setTimeout;

// const result = [1, 2, 3, 4, 5].map(async (item) => {
//   console.log('Starting process!');
//   await timersAsync(1000);
//   console.log(item);
//   console.log(await Promise.resolve('Timeout order!'))
//   await timersAsync(1000);
//   console.count('debug');
//   return item * 2;
// })

// console.log(await Promise.all(result));

setTimeout(async () => {
  console.log('Starting process!');
  await timersAsync(1000);
  console.count('debug');
  console.log(await Promise.resolve('Timeout order!'))
  await timersAsync(1000);
  console.count('debug');

  await Promise.reject('Promise rejected on timeout!');
}, 1000);

const throwError = (msg) => {
  throw new Error(msg);
}

try {
  console.log('Hello');
  console.log('World');
  throwError('Error dentro do try/catch');
} catch (err) {
  console.log('Pego no catch', err.message);
} finally {
  console.log('Executed after all!');
}

process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e || e.message);
})

process.on('uncaughtException', (e) => {
  console.log('uncaughtException', e || e.message);
})

Promise.reject('promise rejected!');

// Se o promise.reject estiver dentro de outro context ele cai dentro do unhandledRejection
setTimeout(async () => {
  await Promise.reject('promise async/await rejected!');
});

// Mas se ele estiver no context global ele cai no uncaughtException

// uncaughtException
setTimeout(() => {
  throwError('erro fora do catch!');
});
