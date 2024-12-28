import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDTO {
  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
