import { Order } from "./entities/order.js";
import { OrderBusiness } from "./business/orderBusiness.js";

const order = new Order({
  customerId: 1,
  amount: 100.0,
  products: [{ describe: "Porche" }],
});

const orderBusiness = new OrderBusiness();

console.info("Order created", orderBusiness.create(order));
