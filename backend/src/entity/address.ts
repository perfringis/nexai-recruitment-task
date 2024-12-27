import { BuildingNumber } from './building.number';
import { City } from './city';
import { Country } from './country';
import { PostalCode } from './postal.code';
import { Street } from './street';

export class Address {
  private readonly street: Street;
  private readonly city: City;
  private readonly country: Country;
  private readonly postalCode: PostalCode;
  private readonly buildingNumber: BuildingNumber;

  constructor(
    street: Street,
    city: City,
    country: Country,
    postalCode: PostalCode,
    buildingNumber: BuildingNumber,
  ) {
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.buildingNumber = buildingNumber;
  }

  public getStreet(): Street {
    return this.street;
  }

  public getCity(): City {
    return this.city;
  }

  public getCountry(): Country {
    return this.country;
  }

  public getPostalCode(): PostalCode {
    return this.postalCode;
  }

  public getBuildingNumber(): BuildingNumber {
    return this.buildingNumber;
  }

  public toString() {
    return `Address { street=${this.street.asString()}, city=${this.city.asString()}, county=${this.country.asString()}, postalCode=${this.postalCode.asString()}, buildingNumber=${this.buildingNumber.asNumber()}}`;
  }
}
