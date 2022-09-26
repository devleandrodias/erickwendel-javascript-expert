export class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} as called withoy an implementation`);

    this.name = NotImplementedException.name;
  }
}
