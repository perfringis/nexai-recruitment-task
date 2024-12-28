import { Address } from 'src/entity/address';
import { BuildingNumber } from 'src/entity/building.number';
import { City } from 'src/entity/city';
import { Country } from 'src/entity/country';
import { PostalCode } from 'src/entity/postal.code';
import { Street } from 'src/entity/street';
import { InvalidStreetException } from 'src/error/invalid.street.exception';

describe('Address Test', () => {
  test('should create address', () => {
    // when
    const address: Address = new Address(
      new Street('Świętokrzyska'),
      new City('Warszawa'),
      new Country('Polska'),
      new PostalCode('00-001'),
      new BuildingNumber('31'),
    );

    // then
    expect(address.toString()).toEqual(
      'Address { street=Świętokrzyska, city=Warszawa, county=Polska, postalCode=00-001, buildingNumber=31}',
    );
  });

  test('should not create address when one of the parts is invalid', () => {
    // expect
    expect(() => {
      new Address(
        new Street(''),
        new City(''),
        new Country(''),
        new PostalCode(''),
        new BuildingNumber(''),
      );
    }).toThrow(new InvalidStreetException('Street value cannot be empty.'));
  });
});
