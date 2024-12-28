import { BadRequestException } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';

export const BuildingNumberTransformer: ValueTransformer = {
  from: (value: string) => new BuildingNumber(value),
  to: (value: BuildingNumber) => value.toString(),
};

export class BuildingNumber {
  private readonly buildingNumber: string;

  constructor(buildingNumber: string) {
    if (!this.valid(buildingNumber)) {
      throw new BadRequestException(
        'Building number cannot be zero or negative.',
      );
    }

    this.buildingNumber = buildingNumber;
  }

  private valid(buildingNumber: string): boolean {
    const value: number = parseInt(buildingNumber, 10);

    return value && value > 0;
  }

  public toString(): string {
    return this.buildingNumber;
  }

  public toNumber(): number {
    return parseInt(this.buildingNumber, 10);
  }

  public equals(other: BuildingNumber): boolean {
    return this.buildingNumber === other.toString();
  }
}
