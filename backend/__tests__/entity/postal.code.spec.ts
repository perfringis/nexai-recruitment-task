import { BadRequestException } from '@nestjs/common';
import { PostalCode } from 'src/value-object/postal.code';

describe('PostalCode Test', () => {
  test('should create PostalCode instance', () => {
    // when
    const postalCode: PostalCode = new PostalCode('11-222');

    // then
    expect(postalCode.toString()).toEqual('11-222');
  });

  test('should not create post code when provided input is not valid', () => {
    // expect
    expect(() => {
      new PostalCode('XX-XXX');
    }).toThrow(
      new BadRequestException('Postal code cannot be empty or have letters.'),
    );

    // expect
    expect(() => {
      new PostalCode('111-22');
    }).toThrow(
      new BadRequestException('Postal code cannot be empty or have letters.'),
    );

    // expect
    expect(() => {
      new PostalCode('');
    }).toThrow(
      new BadRequestException('Postal code cannot be empty or have letters.'),
    );
  });

  test('should not create postal code when provided input is empty', () => {
    // expect
    expect(() => {
      new PostalCode('');
    }).toThrow(
      new BadRequestException('Postal code cannot be empty or have letters.'),
    );
  });
});
