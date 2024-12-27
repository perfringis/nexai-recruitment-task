export class InvalidCountryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCountryException';
    Object.setPrototypeOf(this, InvalidCountryException.prototype);
  }
}
