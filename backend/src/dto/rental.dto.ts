import { Rental } from 'src/entity/rental';
import { CustomerDTO } from './customer.dto';
import { CarDTO } from './car.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RentalDTO {
  @ApiProperty()
  customer: CustomerDTO;

  @ApiProperty()
  car: CarDTO;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  constructor(rental: Rental) {
    this.customer = new CustomerDTO(rental.getCustomer());
    this.car = new CarDTO(rental.getCar());
    this.startAt = rental.getStartAt();
    this.endAt = rental.getEndAt();
  }
}
