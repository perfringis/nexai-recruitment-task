import { InvalidCountryException } from 'src/error/invalid.country.exception';

export class Country {
  private readonly country: string;

  constructor(country: string) {
    if (!this.valid(country)) {
      throw new InvalidCountryException(
        'Provided country has digits or is empty.',
      );
    }

    this.country = country;
  }

  private valid(country: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(country);
  }

  public asString(): string {
    return this.country;
  }

  public equals(otherCountry: Country): boolean {
    return this.country === otherCountry.asString();
  }
}
