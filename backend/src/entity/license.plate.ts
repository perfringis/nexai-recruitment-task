import { InvalidLicensePlateException } from 'src/error/invalid.license.plate.exception';

export class LicensePlate {
  private readonly licensePlate: string;

  constructor(licensePlate: string) {
    if (!this.valid(licensePlate)) {
      throw new InvalidLicensePlateException(
        'Provide value is empty or not valid.',
      );
    }

    this.licensePlate = licensePlate.toUpperCase();
  }

  private valid(licensePlate: string): boolean {
    const regex = /^[A-Z]{1,3}\s?[A-Z0-9]{4,5}$/;

    return regex.test(licensePlate.toUpperCase());
  }

  public asString(): string {
    return this.licensePlate;
  }

  public equals(other: LicensePlate): boolean {
    return this.licensePlate === other.asString();
  }
}
