import { BadRequestException } from '@nestjs/common';
import { BuildingNumber } from 'src/value-object/building.number';

describe('BuildingNumber Test', () => {
  test('should create building number instance', () => {
    //when
    const buildingNumber: BuildingNumber = new BuildingNumber('1');

    // then
    expect(buildingNumber.toString()).toEqual('1');
  });

  test('should not create building number when value is zero', () => {
    // expect
    expect(() => {
      new BuildingNumber('0');
    }).toThrow(
      new BadRequestException('Building number cannot be zero or negative.'),
    );
  });

  test('should not create building number when value is negative', () => {
    // expect
    expect(() => {
      new BuildingNumber('-1');
    }).toThrow(
      new BadRequestException('Building number cannot be zero or negative.'),
    );
  });
});
