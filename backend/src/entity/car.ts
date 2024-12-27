import { LicensePlate } from './license.plate';
import { VehicleIdentificationNumber } from './vehicle.identification.number';

export class Car {
  private readonly brand: string;
  private readonly licensePlate: LicensePlate;
  private readonly vin: VehicleIdentificationNumber;

  constructor(
    brand: string,
    licensePlate: LicensePlate,
    vin: VehicleIdentificationNumber,
  ) {
    this.brand = brand;
    this.licensePlate = licensePlate;
    this.vin = vin;
  }

  public getBrand(): string {
    return this.brand;
  }

  public getLicensePlate(): LicensePlate {
    return this.licensePlate;
  }

  public getVIN(): VehicleIdentificationNumber {
    return this.vin;
  }
}
