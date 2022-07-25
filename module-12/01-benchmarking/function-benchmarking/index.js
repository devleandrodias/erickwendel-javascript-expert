import Benchmark from "benchmark";

import database from '../database.js'

import CartIdNew from './cart-id/cart-id-new.js';
import CartIdOld from './cart-id/cart-id-old.js';

import CartRmPropOld from "./cart-rm-prop/cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop/cart-rm-prop.new.js";

import CartPriceOld from './cart-price/cart-price-old.js';
import CartPriceNew from './cart-price/cart-price-new.js';

const suite = new Benchmark.Suite;

//#region Test Cart Id

// suite
//   .add('Cart#cartIdUUID', () => {
//     new CartIdOld()
//   })
//   .add('Cart#cartIdCrypto', () => {
//     new CartIdNew()
//   })
//   .on('cycle', (event) => { console.log(String(event.target)) })
//   .on('complete', function () { console.log(`Fastest is ${this.filter('fastest').map('name')}`) })
//   .run({ async: true })

//#endregion

//#region Test Cart Remove Prop

// const mockData = {
//   products: [
//     {
//       id: 'ae',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123
//     },
//     {
//       id: 'iai',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 643
//     }
//   ]
// }

// suite
//   .add('Cart#removePropMapReduce', () => {
//     new CartRmPropOld(mockData)
//   })
//   .add('Cart#removePropFor', () => {
//     new CartRmPropNew(mockData)
//   })
//   .on('cycle', (event) => { console.log(String(event.target)) })
//   .on('complete', function () { console.log(`Fastest is ${this.filter('fastest').map('name')}`) })
//   .run({ async: true })

//#endregion

//#region Cart Price
suite
  .add('Cart#calcPriceMapReduce', () => {
    new CartPriceOld(database)
  })
  .add('Cart#calcPriceFor', () => {
    new CartPriceNew(database)
  })
  .on('cycle', (event) => { console.log(String(event.target)) })
  .on('complete', function () { console.log(`Fastest is ${this.filter('fastest').map('name')}`) })
  .run({ async: true })
//#endregion