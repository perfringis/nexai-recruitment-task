import { BadRequestException } from '@nestjs/common';
import { VIN } from 'src/entity/vin';

describe('VIN Test', () => {
  test('should create VIN instance', () => {
    // when
    const vin: VIN = new VIN('JH4KA4531KC033525');

    // then
    expect(vin.toString()).toEqual('JH4KA4531KC033525');
  });

  test('should not create VIN instance when value is empty', () => {
    // expect
    expect(() => {
      new VIN('');
    }).toThrow(
      new BadRequestException(
        'Provided value cannot be empty, less than 17 characters or exclude I, O, Q.',
      ),
    );
  });

  test('should not create VIN instance when value includes I, O or Q', () => {
    // expect
    expect(() => {
      new VIN('IH4KA4531KC033525');
    }).toThrow(
      new BadRequestException(
        'Provided value cannot be empty, less than 17 characters or exclude I, O, Q.',
      ),
    );
  });

  test('should not create VIN instance when value has no 17 characters', () => {
    // expect
    expect(() => {
      new VIN('JH4KA4531KC03352');
    }).toThrow(
      new InvalidVINException(
        'Provided value cannot be empty, less than 17 characters or exclude I, O, Q.',
      ),
    );
  });
});
