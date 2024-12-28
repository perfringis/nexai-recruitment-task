import { InvalidPostalCodeException } from 'src/error/invalid.postal.code.exception';

export class PostalCode {
  private postalCode: string;

  constructor(postalCode: string) {
    if (!this.valid(postalCode)) {
      throw new InvalidPostalCodeException('Invalid postal code.');
    }

    this.postalCode = postalCode;
  }

  private valid(postalCode: string): boolean {
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    return regex.test(postalCode);
  }

  public toString(): string {
    return this.postalCode;
  }

  public equals(other: PostalCode): boolean {
    return this.postalCode === other.toString();
  }
}
