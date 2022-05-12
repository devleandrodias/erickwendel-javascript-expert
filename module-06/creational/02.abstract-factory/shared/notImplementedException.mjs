export default class NotImplementedExeception extends Error {
  constructor(message) {
    super(`The "${message}" function was not implemented.`);
    this.name = NotImplementedExeception.name;
  }
}
