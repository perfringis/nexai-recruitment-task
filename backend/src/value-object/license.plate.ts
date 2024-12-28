import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const LicensePlateTransformer: ValueTransformer = {
  from: (value: string) => new LicensePlate(value),
  to: (value: LicensePlate) => value.toString(),
};

export class LicensePlate {
  private readonly value: string;

  constructor(value: string) {
    if (!this.valid(value)) {
      throw new BadRequestException('Provide value is empty or not valid.');
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
