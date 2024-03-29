import Payment from "./events/payment.js";

import PaymentSubject from "./subjects/paymentSubject.js";

import Shipment from "./observers/shipment.js";
import Marketing from "./observers/marketing.js";

const subject = new PaymentSubject();

const shipment = new Shipment();
subject.subscribe(shipment);

const marketing = new Marketing();
subject.subscribe(marketing);

const payment = new Payment(subject);

payment.creditCard({ username: "Leandro Dias", id: new Date().getTime() });

subject.unsubscribe(marketing);

payment.creditCard({ username: "Thaisa Castro", id: new Date().getTime() });
