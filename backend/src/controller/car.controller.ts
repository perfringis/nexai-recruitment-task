import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarDTO } from 'src/dto/car.dto';
import { CreateCarDTO } from 'src/dto/create.car.dto';
import { UpdateCarDTO } from 'src/dto/update.car.dto';
import { Car } from 'src/entity/car';
import { CarService } from 'src/service/car.service';
import { VINValidationPipe } from 'src/validation/vin.validation.pipe';
import { Response } from 'express';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/cars')
  public async getCars(): Promise<CarDTO[]> {
    const cars: Car[] = await this.carService.getCars();

    return this.toDTOs(cars);
  }

  @Get('/car/:vin')
  public async getCar(
    @Param('vin', VINValidationPipe) vin: string,
  ): Promise<CarDTO> {
    const car: Car = await this.carService.getCar(vin);

    return this.toDTO(car);
  }

  @Post('/car')
  @UsePipes(ValidationPipe)
  public async createCar(@Body() dto: CreateCarDTO): Promise<CarDTO> {
    const createdCar: Car = await this.carService.createCar(dto);

    return this.toDTO(createdCar);
  }

  @Put('/car/:vin')
  @UsePipes(ValidationPipe)
  public async updateCar(
    @Param('vin', VINValidationPipe) vin: string,
    @Body() dto: UpdateCarDTO,
  ): Promise<CarDTO> {
    const updatedCar: Car = await this.carService.updateCar(vin, dto);

    return this.toDTO(updatedCar);
  }

  @Delete('/car/:vin')
  public async deleteCar(
    @Param('vin', VINValidationPipe) vin: string,
    @Res() response: Response,
  ): Promise<void> {
    await this.carService.deleteCar(vin);

    response.status(HttpStatus.OK).send({
      message: `Car with VIN ${vin} has been deleted successfully.`,
    });
  }

  private toDTOs(cars: Car[]): CarDTO[] {
    return cars.map((car) => this.toDTO(car));
  }

  private toDTO(car: Car): CarDTO {
    return new CarDTO(car);
  }
}
