"use strict";

const Event = require("events");

const event = new Event();

const eventName = "counter";

event.on(eventName, (msg) => console.log("counter updated", msg));

event.emit(eventName, "hi!");
event.emit(eventName, "bye!");

const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, value) => {
    event.emit(eventName, { value, key: target[propertyKey] });
    target[propertyKey] = value;
    return true;
  },
  get: (object, prop) => {
    // console.log("chamou!", { object, prop });
    return object[prop];
  },
});

// jája e sempre
setInterval(function () {
  proxy.counter += 1;
  if (proxy.counter === 10) {
    clearInterval(this);
    console.log("[3]: interval!");
  }
}, 200);

// futuro
setTimeout(() => {
  proxy.counter = 4;
  console.log("[2]: timeout!");
}, 100);

// se quer que executa agora
setImmediate(() => {
  console.log("[1]: setImmediate", proxy.counter);
});

// Executa agora, agorinha, mas acaba com o ciclo de vida do node (Má prática)
process.nextTick(() => {
  proxy.counter = 5;
  console.log("[0]: nextTick");
});
