import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function* myCustomReadable() {
  yield Buffer.from('This is my');
  await setTimeout(100);
  yield Buffer.from('Custom readable');
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = []

  for await (const chunk of stream) {
    console.log('[Duplex Writable]', chunk)
    bytesRead += chunk.length;
    wholeString.push(chunk)
  }

  yield `WholeString ${wholeString.join()}`
  yield `BytesRead ${bytesRead}`
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log('[Writable]', chunk)
  }
}

try {
  const controller = new AbortController()

  // Caso precise cancelar um flluxo, controller.abort
  setImmediate(() => controller.abort())

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal }
  )

  console.log('Process finished')
} catch (error) {
  console.error(`\n Abort: `, error.message)
}