import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VIN, VINTransformer } from 'src/value-object/vin';
import {
  LicensePlate,
  LicensePlateTransformer,
} from 'src/value-object/license.plate';
import { Customer } from './customer';
import { Rental } from './rental';
import { ConflictException } from '@nestjs/common';

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

  public setBrand(brand: string): void {
    this.brand = brand;
  }

  public getLicensePlate(): LicensePlate {
    return this.licensePlate;
  }

  public setLicensePlate(licensePlate: LicensePlate): void {
    this.licensePlate = licensePlate;
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

  public rent(): void {
    this.status = CarStatus.RENTED;
  }

  public return(): void {
    if (this.isAvailable()) {
      throw new ConflictException('Car is already returned.');
    }

    this.status = CarStatus.AVAILABLE;
  }

  public rentBy(customer: Customer): Rental {
    if (this.isRented()) {
      throw new ConflictException('Car is already rented.');
    }

    this.rent();

    return new Rental(customer, this);
  }
}
