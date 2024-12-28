import { LicensePlate } from './license.plate';
import { VIN } from './vin';

export class Car {
  private readonly brand: string;
  private readonly licensePlate: LicensePlate;
  private readonly vin: VIN;

  constructor(brand: string, licensePlate: LicensePlate, vin: VIN) {
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

  public getVIN(): VIN {
    return this.vin;
  }
}
