import { ApiProperty } from '@nestjs/swagger';
import { Car } from 'src/entity/car';

export class CarDTO {
  @ApiProperty()
  vin: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  status: string;

  constructor(car: Car) {
    this.vin = car.getVIN().toString();
    this.brand = car.getBrand();
    this.licensePlate = car.getLicensePlate().toString();
    this.status = car.getStatus();
  }
}
