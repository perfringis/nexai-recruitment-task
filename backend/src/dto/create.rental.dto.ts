import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { IsVIN } from 'src/validation/vin.validator';

export class CreateRentalDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsVIN()
  vin: string;
}
