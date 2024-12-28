export class InvalidVINException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidVINException';
    Object.setPrototypeOf(this, InvalidVINException.prototype);
  }
}
