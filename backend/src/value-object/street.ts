import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const StreetTransformer: ValueTransformer = {
  from: (value: string) => new Street(value),
  to: (value: Street) => value.toString(),
};

export class Street {
  private readonly street: string;

  constructor(street: string) {
    if (!street) {
      throw new BadRequestException('Street cannot be empty.');
    }

    this.street = street;
  }

  public toString(): string {
    return this.street;
  }

  public equals(other: Street): boolean {
    return this.street === other.toString();
  }
}
