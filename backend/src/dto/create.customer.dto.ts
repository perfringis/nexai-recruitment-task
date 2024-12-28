import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressDTO } from './create.address.dto';

export class CreateCustomerDTO {
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
  address: CreateAddressDTO;
}
