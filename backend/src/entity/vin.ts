import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const VINTransformer: ValueTransformer = {
  from: (value: string) => new VIN(value),
  to: (value: VIN) => value.toString(),
};

export class VIN {
  private value: string;

  constructor(value: string) {
    if (!this.valid(value)) {
      throw new BadRequestException(
        'Provided value cannot be empty, less than 17 characters or exclude I, O, Q.',
      );
    }

    this.value = value;
  }

  private valid(value: string): boolean {
    const regex = /^[A-HJ-NPR-Z0-9]{17}$/;

    return regex.test(value);
  }

  public toString(): string {
    return this.value;
  }
}
