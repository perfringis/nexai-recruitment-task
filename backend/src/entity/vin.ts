import { InvalidVINException } from 'src/error/invalid.vin.exception';

export class VIN {
  private readonly vin: string;

  constructor(vin: string) {
    if (!this.valid(vin)) {
      throw new InvalidVINException(
        'Provided value cannot be empty, less than 17 characters or exclude I, O, Q.',
      );
    }

    this.vin = vin;
  }

  private valid(vin: string): boolean {
    const regex = /^[A-HJ-NPR-Z0-9]{17}$/;

    return regex.test(vin);
  }

  public toString(): string {
    return this.vin;
  }
}
