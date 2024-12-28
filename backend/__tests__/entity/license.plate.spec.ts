import { BadRequestException } from '@nestjs/common';
import { LicensePlate } from 'src/entity/license.plate';

describe('LicensePlate Test', () => {
  test('should create instance of license plate', () => {
    // when
    const licensePlate: LicensePlate = new LicensePlate('rz 7728j');

    // then
    expect(licensePlate.toString()).toEqual('RZ 7728J');
  });

  test('should not create instance of license plate when value is not valid', () => {
    // expect
    expect(() => {
      new LicensePlate('RZ 7728JA');
    }).toThrow(new BadRequestException('Provide value is empty or not valid.'));
  });

  test('should not create instance of license plate when value is missing', () => {
    // expect
    expect(() => {
      new LicensePlate('');
    }).toThrow(new BadRequestException('Provide value is empty or not valid.'));
  });
});
