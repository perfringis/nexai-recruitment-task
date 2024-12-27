import { InvalidBuildingNumberException } from 'src/error/invalid.building.number.exception';

export class BuildingNumber {
  private readonly buildingNumber: string;

  constructor(buildingNumber: string) {
    if (!this.valid(buildingNumber)) {
      throw new InvalidBuildingNumberException(
        'Provided value cannot be zero or negative.',
      );
    }

    this.buildingNumber = buildingNumber;
  }

  private valid(buildingNumber: string): boolean {
    const value: number = parseInt(buildingNumber, 10);

    return value && value > 0;
  }

  public asString(): string {
    return this.buildingNumber;
  }

  public asNumber(): number {
    return parseInt(this.buildingNumber, 10);
  }

  public equals(other: BuildingNumber): boolean {
    return this.buildingNumber === other.asString();
  }
}
