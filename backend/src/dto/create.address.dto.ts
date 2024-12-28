import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  buildingNumber: string;
}
