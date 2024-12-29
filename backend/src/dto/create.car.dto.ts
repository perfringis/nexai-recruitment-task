import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
