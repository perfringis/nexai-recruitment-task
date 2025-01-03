import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDTO } from 'src/dto/create.car.dto';
import { UpdateCarDTO } from 'src/dto/update.car.dto';
import { Car, CarStatus } from 'src/entity/car';
import { Rental } from 'src/entity/rental';
import { CarRepository } from 'src/repository/car.repository';
import { RentalRepository } from 'src/repository/rental.repository';
import { LicensePlate } from 'src/value-object/license.plate';
import { VIN } from 'src/value-object/vin';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly rentalRepository: RentalRepository,
  ) {}

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

    const rental: Rental = await this.rentalRepository.findByCarId(car.id);
    if (rental) {
      throw new ConflictException(
        'Car is rented, cannot be deleted, vin = ' + vin,
      );
    }

    if (!car) {
      throw new NotFoundException('Car does not exists, vin = ' + vin);
    }

    await this.carRepository.remove(car);
  }
}
