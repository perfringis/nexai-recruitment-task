import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const FirstNameTransformer: ValueTransformer = {
  from: (value: string) => new FirstName(value),
  to: (value: FirstName) => value.toString(),
};

export class FirstName {
  private readonly firstName: string;

  constructor(firstName: string) {
    if (!this.valid(firstName)) {
      throw new BadRequestException(
        'Firstname cannot be empty or have digits.',
      );
    }

    this.firstName = firstName;
  }

  public valid(firstName: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(firstName);
  }

  public toString(): string {
    return this.firstName;
  }

  public equals(other: FirstName): boolean {
    return this.firstName === other.toString();
  }
}
