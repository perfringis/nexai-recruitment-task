import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { IsVIN } from 'src/validation/vin.validator';

export class CreateRentalDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsVIN()
  vin: string;
}
