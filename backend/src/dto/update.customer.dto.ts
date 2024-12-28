import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UpdateAddressDTO } from './update.address.dto';

export class UpdateCustomerDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  address: UpdateAddressDTO;
}
