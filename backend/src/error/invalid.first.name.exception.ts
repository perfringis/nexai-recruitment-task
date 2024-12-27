export class InvalidFirstNameException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFirstNameException';
    Object.setPrototypeOf(this, InvalidFirstNameException.prototype);
  }
}
