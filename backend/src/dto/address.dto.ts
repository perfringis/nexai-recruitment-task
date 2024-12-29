import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/value-object/address';

export class AddressDTO {
  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  buildingNumber: string;

  constructor(address: Address) {
    this.street = address.getStreet().toString();
    this.city = address.getCity().toString();
    this.country = address.getCountry().toString();
    this.postalCode = address.getPostalCode().toString();
    this.buildingNumber = address.getBuildingNumber().toString();
  }
}
