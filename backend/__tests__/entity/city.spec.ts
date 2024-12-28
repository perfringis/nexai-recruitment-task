import { BadRequestException } from '@nestjs/common';
import { City } from 'src/value-object/city';

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
    }).toThrow(new BadRequestException('City cannot be empty or have digits.'));
  });

  test('should not create city when provided input is empty', () => {
    // expect
    expect(() => {
      new City('');
    }).toThrow(new BadRequestException('City cannot be empty or have digits.'));
  });
});
