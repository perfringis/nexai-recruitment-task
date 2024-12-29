import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressDTO } from './create.address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  address: CreateAddressDTO;
}
