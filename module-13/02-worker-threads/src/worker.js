import { parentPort } from "node:worker_threads";

import sharp from "sharp";
import axios from "axios";

async function downloadUrl(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return response.data;
}

async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadUrl(image))
    // .grayscale()
    // .rotate(90)
    .toBuffer();

  const secondLayer = await sharp(await downloadUrl(background))
    .composite([
      {
        input: firstLayer,
        gravity: sharp.gravity.center,
      },
    ])
    .toBuffer();

  parentPort.postMessage(secondLayer.toString("base64"));
}

parentPort.on("message", onMessage);
