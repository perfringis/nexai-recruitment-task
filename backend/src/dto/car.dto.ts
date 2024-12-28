import { Car } from 'src/entity/car';

export class CarDTO {
  vin: string;
  brand: string;
  licensePlate: string;
  status: string;

  constructor(car: Car) {
    this.vin = car.getVIN().toString();
    this.brand = car.getBrand();
    this.licensePlate = car.getLicensePlate().toString();
    this.status = car.getStatus();
  }
}
