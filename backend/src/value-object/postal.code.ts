import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const PostalCodeTransformer: ValueTransformer = {
  from: (value: string) => new PostalCode(value),
  to: (value: PostalCode) => value.toString(),
};

export class PostalCode {
  private readonly postalCode: string;

  constructor(postalCode: string) {
    if (!this.valid(postalCode)) {
      throw new BadRequestException(
        'Postal code cannot be empty or have letters.',
      );
    }

    this.postalCode = postalCode;
  }

  private valid(postalCode: string): boolean {
    const regex = /^[0-9]{2}-[0-9]{3}$/;
    return regex.test(postalCode);
  }

  public toString(): string {
    return this.postalCode;
  }

  public equals(other: PostalCode): boolean {
    return this.postalCode === other.toString();
  }
}
