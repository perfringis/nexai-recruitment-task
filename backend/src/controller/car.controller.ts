import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarDTO } from 'src/dto/car.dto';
import { CreateCarDTO } from 'src/dto/create.dto';
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

  @Get('/car/:vin')
  public async getCar(@Param('vin') vin: string): Promise<CarDTO> {
    const car: Car = await this.carService.getCar(vin);

    return this.toDTO(car);
  }

  @Post('/car')
  public async createCar(@Body() dto: CreateCarDTO) {
    return this.carService.createCar(dto);
  }

  private toDTOs(cars: Car[]): CarDTO[] {
    return cars.map((car) => this.toDTO(car));
  }

  private toDTO(car: Car): CarDTO {
    return new CarDTO(car);
  }
}
