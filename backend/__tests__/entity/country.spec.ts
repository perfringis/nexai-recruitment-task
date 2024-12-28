import { BadRequestException } from '@nestjs/common';
import { Country } from 'src/value-object/country';

describe('County Test', () => {
  test('should create county instance', () => {
    // when
    const country: Country = new Country('Polska');
    // then
    expect(country.toString()).toEqual('Polska');
  });

  test('should not create country when provided input is not valid', () => {
    // expect
    expect(() => {
      new Country('P01ska');
    }).toThrow(
      new BadRequestException('County cannot be empty or have digits.'),
    );
  });

  test('should not create country when provided input is empty', () => {
    // expect
    expect(() => {
      new Country('');
    }).toThrow(
      new BadRequestException('County cannot be empty or have digits.'),
    );
  });
});
