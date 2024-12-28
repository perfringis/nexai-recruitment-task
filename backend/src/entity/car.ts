import { Column, Entity, PrimaryColumn } from 'typeorm';
import { LicensePlate } from './license.plate';
import { VIN } from './vin';

export enum CarStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
}

@Entity({ name: 'car' })
export class Car {
  @PrimaryColumn({
    name: 'vin',
    type: 'varchar',
  })
  private vin: VIN;

  @Column({ name: 'brand', type: 'varchar' })
  private brand: string;

  @Column(() => LicensePlate, {
    prefix: true,
  })
  private licensePlate: LicensePlate;

  @Column({ name: 'status', type: 'enum', enum: CarStatus })
  private status: CarStatus;

  constructor(
    brand: string,
    licensePlate: LicensePlate,
    vin: VIN,
    status: CarStatus,
  ) {
    this.vin = vin;
    this.brand = brand;
    this.licensePlate = licensePlate;
    this.status = status;
  }

  public getVIN(): VIN {
    return this.vin;
  }

  public getBrand(): string {
    return this.brand;
  }

  public getLicensePlate(): LicensePlate {
    return this.licensePlate;
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
