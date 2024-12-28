import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LicensePlate, LicensePlateTransformer } from './license.plate';
import { VIN, VINTransformer } from './vin';

export enum CarStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
}

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ name: 'vin', type: 'varchar', transformer: VINTransformer })
  vin: VIN;

  @Column({ name: 'brand', type: 'varchar' })
  private brand: string;

  @Column({
    name: 'license_plate',
    type: 'varchar',
    transformer: LicensePlateTransformer,
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

  public getId(): string {
    return this.id;
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
