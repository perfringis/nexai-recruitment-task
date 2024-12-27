import { InvalidCityException } from 'src/error/invalid.city.exception';

export class City {
  private readonly city: string;

  constructor(city: string) {
    if (!this.valid(city)) {
      throw new InvalidCityException('Provided city has digits or is empty.');
    }

    this.city = city;
  }

  private valid(city: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(city);
  }

  public asString(): string {
    return this.city;
  }

  public equals(otherCity: City): boolean {
    return this.city === otherCity.asString();
  }
}
