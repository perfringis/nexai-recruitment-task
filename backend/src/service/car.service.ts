import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDTO } from 'src/dto/create.dto';
import { UpdateCarDTO } from 'src/dto/update.car.dto';
import { Car, CarStatus } from 'src/entity/car';
import { CarRepository } from 'src/repository/car.repository';
import { LicensePlate } from 'src/value-object/license.plate';
import { VIN } from 'src/value-object/vin';

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

  public async createCar(dto: CreateCarDTO): Promise<Car> {
    const existing: Car = await this.carRepository.findByVIN(dto.vin);

    if (existing) {
      throw new ConflictException('Car is defined.');
    }

    const car: Car = new Car(
      dto.brand,
      new LicensePlate(dto.licensePlate),
      new VIN(dto.vin),
      CarStatus.AVAILABLE,
    );

    return await this.carRepository.save(car);
  }

  public async updateCar(vin: string, dto: UpdateCarDTO): Promise<Car> {
    const car: Car = await this.carRepository.findByVIN(vin);

    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + vin);
    }

    car.setBrand(dto.brand);
    car.setLicensePlate(new LicensePlate(dto.licensePlate));

    return await this.carRepository.save(car);
  }

  public async deleteCar(vin: string): Promise<void> {
    const car: Car = await this.carRepository.findByVIN(vin);

    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + vin);
    }

    await this.carRepository.remove(car);
  }
}
