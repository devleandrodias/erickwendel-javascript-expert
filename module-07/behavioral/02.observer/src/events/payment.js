export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard(paymentData) {
    console.log(`\n A payment occurred from ${paymentData.username}`);
    this.paymentSubject.notify(paymentData);
  }
}
