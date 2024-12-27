export class InvalidPostalCodeException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPostalCodeException';
    Object.setPrototypeOf(this, InvalidPostalCodeException.prototype);
  }
}
