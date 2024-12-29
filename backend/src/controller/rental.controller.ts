import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRentalDTO } from 'src/dto/create.rental.dto';
import { RentalDTO } from 'src/dto/rental.dto';
import { Rental } from 'src/entity/rental';
import { RentalService } from 'src/service/rental.service';
import { VINValidationPipe } from 'src/validation/vin.validation.pipe';
import { Response } from 'express';

@Controller('/rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async rent(@Body() dto: CreateRentalDTO): Promise<RentalDTO> {
    const rental: Rental = await this.rentalService.rent(dto);

    return this.toDTO(rental);
  }

  @Put('/:vin/return')
  public async return(
    @Param('vin', VINValidationPipe) vin: string,
    @Res() response: Response,
  ): Promise<void> {
    await this.rentalService.return(vin);

    response.status(HttpStatus.OK).send({
      message: `Car with vin = ${vin} has been returned successfully.`,
    });
  }

  private toDTO(rental: Rental): RentalDTO {
    return new RentalDTO(rental);
  }
}
