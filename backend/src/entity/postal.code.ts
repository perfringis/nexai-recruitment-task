import { InvalidPostalCodeException } from 'src/error/invalid.postal.code.exception';

export class PostalCode {
  private postalCode: string;

  private constructor(postalCode: string) {
    this.postalCode = postalCode;
  }

  public static of(postalCode: string): PostalCode {
    if (!this.valid(postalCode)) {
      throw new InvalidPostalCodeException('Invalid postal code.');
    }

    return new PostalCode(postalCode);
  }

  private static valid(postalCode: string): boolean {
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    return regex.test(postalCode);
  }

  public asString(): string {
    return this.postalCode;
  }

  public equals(otherPostalCode: PostalCode): boolean {
    return this.postalCode === otherPostalCode.asString();
  }
}
