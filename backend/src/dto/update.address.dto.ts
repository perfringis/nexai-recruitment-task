import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  buildingNumber: string;
}
