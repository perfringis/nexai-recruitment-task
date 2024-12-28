import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const EmailTransformer: ValueTransformer = {
  from: (value: string) => new Email(value),
  to: (value: Email) => value.toString(),
};

export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.valid(value)) {
      throw new BadRequestException('Email is empty or has no valid format.');
    }

    this.value = value;
  }

  private valid(value: string) {
    const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.toString();
  }
}
