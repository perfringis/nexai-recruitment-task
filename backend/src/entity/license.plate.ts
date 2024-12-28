import { InvalidLicensePlateException } from 'src/error/invalid.license.plate.exception';
import { ValueTransformer } from 'typeorm';

export const LicensePlateTransformer: ValueTransformer = {
  from: (value: string) => new LicensePlate(value),
  to: (value: LicensePlate) => value.toString(),
};

export class LicensePlate {
  private value: string;

  constructor(value: string) {
    if (!this.valid(value)) {
      throw new InvalidLicensePlateException(
        'Provide value is empty or not valid.',
      );
    }

    this.value = value.toUpperCase();
  }

  private valid(value: string): boolean {
    const regex = /^[A-Z]{1,3}\s?[A-Z0-9]{4,5}$/;

    return regex.test(value.toUpperCase());
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: LicensePlate): boolean {
    return this.value === other.toString();
  }
}
