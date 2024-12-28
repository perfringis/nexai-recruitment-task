import { BadRequestException } from '@nestjs/common';
import { LastName } from 'src/value-object/last.name';

describe('LastName Test', () => {
  test('should create Last name instance', () => {
    // when
    const lastName: LastName = new LastName('Doe');
    // then
    expect(lastName.toString()).toEqual('Doe');
  });

  test('should not create Last name when input is not valid', () => {
    // expect
    expect(() => {
      new LastName('D0e');
    }).toThrow(
      new BadRequestException('Lastname cannot be empty or have digits.'),
    );
  });

  test('should not create Last name when input is empty', () => {
    // expect
    expect(() => {
      new LastName('');
    }).toThrow(
      new BadRequestException('Lastname cannot be empty or have digits.'),
    );
  });
});
