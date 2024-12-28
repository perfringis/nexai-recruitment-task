import { Address } from 'src/value-object/address';

export class AddressDTO {
  street: string;
  city: string;
  country: string;
  postalCode: string;
  buildingNumber: string;

  constructor(address: Address) {
    this.street = address.getStreet().toString();
    this.city = address.getCity().toString();
    this.country = address.getCountry().toString();
    this.postalCode = address.getPostalCode().toString();
    this.buildingNumber = address.getBuildingNumber().toString();
  }
}
