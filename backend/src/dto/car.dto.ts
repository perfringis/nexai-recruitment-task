import { Car } from 'src/entity/car';

export class CarDTO {
  public vin: string;
  public brand: string;
  public licensePlate: string;
  public status: string;

  constructor(car: Car) {
    this.vin = car.getVIN().toString();
    this.brand = car.getBrand();
    this.licensePlate = car.getLicensePlate().toString();
    this.status = car.getStatus();
  }
}
