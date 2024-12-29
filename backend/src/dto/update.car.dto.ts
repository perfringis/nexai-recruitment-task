import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCarDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
