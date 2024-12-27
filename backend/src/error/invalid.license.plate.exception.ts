export class InvalidLicensePlateException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidLicensePlateException';
    Object.setPrototypeOf(this, InvalidLicensePlateException.prototype);
  }
}
