import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { IsVIN } from 'src/validation/vin.validator';
import { CreateCustomerDTO } from './create.customer.dto';

export class CreateRentalDTO {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  customer: CreateCustomerDTO;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsVIN()
  vin: string;
}
