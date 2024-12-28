import { BadRequestException } from '@nestjs/common';
import { Address } from 'src/value-object/address';
import { BuildingNumber } from 'src/value-object/building.number';
import { City } from 'src/value-object/city';
import { Country } from 'src/value-object/country';
import { PostalCode } from 'src/value-object/postal.code';
import { Street } from 'src/value-object/street';

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
    }).toThrow(new BadRequestException('Street cannot be empty.'));
  });
});
