import { BadRequestException } from '@nestjs/common';
import { FirstName } from 'src/value-object/first.name';

describe('FirstName Test', () => {
  test('should create first name instance', () => {
    // when
    const firstName: FirstName = new FirstName('Joe');
    // then
    expect(firstName.toString()).toEqual('Joe');
  });

  test('should not create first name when input is not valid', () => {
    // expect
    expect(() => {
      new FirstName('J0e');
    }).toThrow(
      new BadRequestException('Firstname cannot be empty or have digits.'),
    );
  });

  test('should not create first name when input is empty', () => {
    // expect
    expect(() => {
      new FirstName('');
    }).toThrow(
      new BadRequestException('Firstname cannot be empty or have digits.'),
    );
  });
});
