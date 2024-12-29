import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Car')
@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all cars.',
    type: [CarDTO],
    example: [
      {
        vin: 'JH4KA4531KC033525',
        brand: 'BMW',
        licensePlate: 'RZ 7728J',
        status: 'available',
      },
    ],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Get('/cars')
  public async getCars(): Promise<CarDTO[]> {
    const cars: Car[] = await this.carService.getCars();

    return this.toDTOs(cars);
  }

  @ApiOperation({ summary: 'Get car by vin number' })
  @ApiResponse({
    status: 200,
    description: 'Successfully a car.',
    type: CarDTO,
    example: {
      vin: 'JH4KA4531KC033525',
      brand: 'BMW',
      licensePlate: 'RZ 7728J',
      status: 'available',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Car does not exists.',
    type: NotFoundException,
    example: {
      message: 'Car does not exists, vin = JH4KA4531KC033525',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Get('/car/:vin')
  public async getCar(
    @Param('vin', VINValidationPipe) vin: string,
  ): Promise<CarDTO> {
    const car: Car = await this.carService.getCar(vin);

    return this.toDTO(car);
  }

  @ApiOperation({ summary: 'Create a car' })
  @ApiBody({
    type: CreateCarDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully created a car.',
    type: CarDTO,
    example: {
      vin: 'JH4KA4531KC033525',
      brand: 'BMW',
      licensePlate: 'RZ 7728J',
      status: 'available',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Car is defined.',
    type: ConflictException,
    example: {
      message: 'Car is defined.',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Post('/car')
  @UsePipes(ValidationPipe)
  public async createCar(@Body() dto: CreateCarDTO): Promise<CarDTO> {
    const createdCar: Car = await this.carService.createCar(dto);

    return this.toDTO(createdCar);
  }

  @ApiOperation({ summary: 'Update a car' })
  @ApiParam({
    name: 'vin',
    description: 'VIN of the car to update',
    type: String,
  })
  @ApiBody({
    type: UpdateCarDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated a car.',
    type: CarDTO,
    example: {
      vin: 'JH4KA4531KC033525',
      brand: 'BMW',
      licensePlate: 'RZ 7728J',
      status: 'available',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Car does not exists.',
    type: NotFoundException,
    example: {
      message: 'Car does not exists, vin = JH4KA4531KC033525',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Put('/car/:vin')
  @UsePipes(ValidationPipe)
  public async updateCar(
    @Param('vin', VINValidationPipe) vin: string,
    @Body() dto: UpdateCarDTO,
  ): Promise<CarDTO> {
    const updatedCar: Car = await this.carService.updateCar(vin, dto);

    return this.toDTO(updatedCar);
  }

  @ApiOperation({ summary: 'Delete a car' })
  @ApiParam({
    name: 'vin',
    description: 'VIN of the car to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully delete a car.',
    example: {
      message: 'Car with VIN JH4KA4531KC033525 has been deleted successfully.',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Car does not exists.',
    type: NotFoundException,
    example: {
      message: 'Car does not exists, vin = JH4KA4531KC033525',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
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
