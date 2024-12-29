import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UpdateAddressDTO } from './update.address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDTO {
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
  address: UpdateAddressDTO;
}
