import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const CityTransformer: ValueTransformer = {
  from: (value: string) => new City(value),
  to: (value: City) => value.toString(),
};

export class City {
  private readonly city: string;

  constructor(city: string) {
    if (!this.valid(city)) {
      throw new BadRequestException('City cannot be empty or have digits.');
    }

    this.city = city;
  }

  private valid(city: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(city);
  }

  public toString(): string {
    return this.city;
  }

  public equals(other: City): boolean {
    return this.city === other.toString();
  }
}
