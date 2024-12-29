import { Column, Entity } from 'typeorm';
import { BuildingNumber, BuildingNumberTransformer } from './building.number';
import { City, CityTransformer } from './city';
import { Country, CountryTransformer } from './country';
import { PostalCode, PostalCodeTransformer } from './postal.code';
import { Street, StreetTransformer } from './street';
import { BaseEntity } from 'src/entity/base.entity';

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @Column({
    name: 'street',
    type: 'varchar',
    transformer: StreetTransformer,
  })
  private street: Street;

  @Column({
    name: 'city',
    type: 'varchar',
    transformer: CityTransformer,
  })
  private city: City;

  @Column({
    name: 'country',
    type: 'varchar',
    transformer: CountryTransformer,
  })
  private country: Country;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    transformer: PostalCodeTransformer,
  })
  private postalCode: PostalCode;

  @Column({
    name: 'building_number',
    type: 'varchar',
    transformer: BuildingNumberTransformer,
  })
  private buildingNumber: BuildingNumber;

  constructor(
    street: Street,
    city: City,
    country: Country,
    postalCode: PostalCode,
    buildingNumber: BuildingNumber,
  ) {
    super();

    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.buildingNumber = buildingNumber;
  }

  public getStreet(): Street {
    return this.street;
  }

  public setStreet(street: Street): void {
    this.street = street;
  }

  public getCity(): City {
    return this.city;
  }

  public setCity(city: City): void {
    this.city = city;
  }

  public getCountry(): Country {
    return this.country;
  }

  public setCountry(country: Country): void {
    this.country = country;
  }

  public getPostalCode(): PostalCode {
    return this.postalCode;
  }

  public setPostalCode(postalCode: PostalCode): void {
    this.postalCode = postalCode;
  }

  public getBuildingNumber(): BuildingNumber {
    return this.buildingNumber;
  }

  public setBuildingNumber(buildingNumber: BuildingNumber): void {
    this.buildingNumber = buildingNumber;
  }

  public toString() {
    return `Address { street=${this.street.toString()}, city=${this.city.toString()}, county=${this.country.toString()}, postalCode=${this.postalCode.toString()}, buildingNumber=${this.buildingNumber.toNumber()}}`;
  }
}
