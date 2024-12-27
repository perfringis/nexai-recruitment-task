export class InvalidLastNameException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidLastNameException';
    Object.setPrototypeOf(this, InvalidLastNameException.prototype);
  }
}
