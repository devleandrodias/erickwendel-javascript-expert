import { expect, describe, test, jest, beforeAll } from "@jest/globals";

import Payment from "../src/events/payment";
import Marketing from "../src/observers/marketing";
import Shipment from "../src/observers/shipment";
import PaymentSubject from "../src/subjects/paymentSubject";

describe("Test suite for Observer Pattern", () => {
  test("#PaymentSubject notify observer", () => {
    const subject = new PaymentSubject();

    const observer = { update: jest.fn() };

    const data = "Hello World";

    const expected = data;

    subject.subscribe(observer);
    subject.notify(data);

    expect(observer.update).toBeCalledWith(expected);
  });

  test("#PaymentSubject should not notify unsubscribe observers", () => {
    const subject = new PaymentSubject();

    const observer = { update: jest.fn() };

    const data = "Hello World";

    subject.subscribe(observer);
    subject.unsubscribe(observer);

    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test("#PaymentSubject should notify subject after a credit card transaction", () => {
    const paymentSubject = new PaymentSubject();
    const payment = new Payment(paymentSubject);

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    );

    const data = {
      username: "Leandro Dias",
    };

    payment.creditCard(data);

    expect(paymentSubjectNotifySpy).toBeCalledWith(data);
  });

  test("#all should notify subscribers after a credict card payment", () => {
    const paymentSubject = new PaymentSubject();

    const shipment = new Shipment();
    const marketing = new Marketing();

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);

    paymentSubject.subscribe(shipment);
    paymentSubject.subscribe(marketing);

    const payment = new Payment(paymentSubject);

    const data = {
      id: new Date().getTime(),
      username: "Leandro Dias",
    };

    payment.creditCard(data);

    expect(shipmentSpy).toBeCalledWith(data);
    expect(marketingSpy).toBeCalledWith(data);
  });
});
