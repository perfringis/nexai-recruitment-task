import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCarDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
