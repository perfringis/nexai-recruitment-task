import { InvalidLicensePlateException } from 'src/error/invalid.license.plate.exception';
import { Column } from 'typeorm';

export class LicensePlate {
  @Column({
    name: '_value',
    type: 'varchar',
  })
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
