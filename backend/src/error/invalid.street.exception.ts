export class InvalidStreetException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidStreetException';
    Object.setPrototypeOf(this, InvalidStreetException.prototype);
  }
}
