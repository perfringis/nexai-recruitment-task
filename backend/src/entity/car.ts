import { LicensePlate } from './license.plate';
import { VIN } from './vin';

export enum CarStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
}

export class Car {
  private brand: string;
  private licensePlate: LicensePlate;
  private vin: VIN;
  private status: CarStatus;

  constructor(
    brand: string,
    licensePlate: LicensePlate,
    vin: VIN,
    status: CarStatus,
  ) {
    this.brand = brand;
    this.licensePlate = licensePlate;
    this.vin = vin;
    this.status = status;
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

  public getStatus(): CarStatus {
    return this.status;
  }

  public isAvailable(): boolean {
    return this.status === CarStatus.AVAILABLE;
  }

  public isRented(): boolean {
    return this.status === CarStatus.RENTED;
  }
}
