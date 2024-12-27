import { Country } from 'src/entity/country';
import { InvalidCountryException } from 'src/error/invalid.country.exception';

describe('County Test', () => {
  test('should create county instance', () => {
    // when
    const country: Country = new Country('Polska');
    // then
    expect(country.asString()).toEqual('Polska');
  });

  test('should not create country when provided input is not valid', () => {
    // expect
    expect(() => {
      new Country('P01ska');
    }).toThrow(
      new InvalidCountryException('Provided country has digits or is empty.'),
    );
  });

  test('should not create country when provided input is empty', () => {
    // expect
    expect(() => {
      new Country('');
    }).toThrow(
      new InvalidCountryException('Provided country has digits or is empty.'),
    );
  });
});
