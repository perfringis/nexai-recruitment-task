export class InvalidCityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCityException';
    Object.setPrototypeOf(this, InvalidCityException.prototype);
  }
}
