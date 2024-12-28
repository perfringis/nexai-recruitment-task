import { Injectable } from '@nestjs/common';
import { Car } from 'src/entity/car';
import { CarRepository } from 'src/repository/car.repository';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  public async getCars(): Promise<Car[]> {
    return await this.carRepository.find({});
  }
}
