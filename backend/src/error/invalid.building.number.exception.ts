export class InvalidBuildingNumberException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBuildingNumberException';
    Object.setPrototypeOf(this, InvalidBuildingNumberException.prototype);
  }
}
