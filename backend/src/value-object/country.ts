import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const CountryTransformer: ValueTransformer = {
  from: (value: string) => new Country(value),
  to: (value: Country) => value.toString(),
};

export class Country {
  private readonly country: string;

  constructor(country: string) {
    if (!this.valid(country)) {
      throw new BadRequestException('County cannot be empty or have digits.');
    }

    this.country = country;
  }

  private valid(country: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(country);
  }

  public toString(): string {
    return this.country;
  }

  public equals(other: Country): boolean {
    return this.country === other.toString();
  }
}
