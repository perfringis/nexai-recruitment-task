import { InvalidStreetException } from 'src/error/invalid.street.exception';

export class Street {
  private readonly street: string;

  constructor(street: string) {
    if (!street) {
      throw new InvalidStreetException('Street value cannot be empty.');
    }

    this.street = street;
  }

  public asString(): string {
    return this.street;
  }

  public equals(other: Street): boolean {
    return this.street === other.asString();
  }
}
