import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const LastNameTransformer: ValueTransformer = {
  from: (value: string) => new LastName(value),
  to: (value: LastName) => value.toString(),
};

export class LastName {
  private readonly lastName: string;

  constructor(lastName: string) {
    if (!this.valid(lastName)) {
      throw new BadRequestException('Lastname cannot be empty or have digits.');
    }

    this.lastName = lastName;
  }

  public valid(lastName: string): boolean {
    const regex = /^[A-Za-z]+$/;

    return regex.test(lastName);
  }

  public toString(): string {
    return this.lastName;
  }

  public equals(other: LastName): boolean {
    return this.lastName === other.toString();
  }
}
