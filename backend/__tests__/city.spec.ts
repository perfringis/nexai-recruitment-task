import { City } from 'src/entity/city';
import { InvalidCityException } from 'src/error/invalid.city.exception';

describe('City Test', () => {
  test('should create city instance', () => {
    // when
    const city: City = new City('Wroclaw');
    // then
    expect(city.toString()).toEqual('Wroclaw');
  });

  test('should not create city when provided input is not valid', () => {
    // expect
    expect(() => {
      new City('Wroc1aw');
    }).toThrow(
      new InvalidCityException('Provided city has digits or is empty.'),
    );
  });

  test('should not create city when provided input is empty', () => {
    // expect
    expect(() => {
      new City('');
    }).toThrow(
      new InvalidCityException('Provided city has digits or is empty.'),
    );
  });
});
