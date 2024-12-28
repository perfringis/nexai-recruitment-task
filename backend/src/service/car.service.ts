import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDTO } from 'src/dto/create.dto';
import { Car, CarStatus } from 'src/entity/car';
import { LicensePlate } from 'src/entity/license.plate';
import { VIN } from 'src/entity/vin';
import { CarRepository } from 'src/repository/car.repository';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  public async getCars(): Promise<Car[]> {
    return await this.carRepository.find({});
  }

  public async getCar(vin: string): Promise<Car> {
    const car: Car = await this.carRepository.findByVIN(vin);

    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + vin);
    }

    return car;
  }

  public async createCar(dto: CreateCarDTO) {
    const existing: Car = await this.carRepository.findByVIN(dto.vin);

    if (existing) {
      throw new ConflictException('Car is already defined.');
    }

    const car: Car = new Car(
      dto.brand,
      new LicensePlate(dto.licensePlate),
      new VIN(dto.vin),
      CarStatus.AVAILABLE,
    );

    return await this.carRepository.save(car);
  }
}
