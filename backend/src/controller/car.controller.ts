import { Controller, Get } from '@nestjs/common';
import { CarDTO } from 'src/dto/car.dto';
import { Car } from 'src/entity/car';
import { CarService } from 'src/service/car.service';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/cars')
  public async getCars(): Promise<CarDTO[]> {
    const cars: Car[] = await this.carService.getCars();

    return this.toDTOs(cars);
  }

  private toDTOs(cars: Car[]): CarDTO[] {
    return cars.map((car) => this.toDTO(car));
  }

  private toDTO(car: Car): CarDTO {
    return new CarDTO(car);
  }
}
