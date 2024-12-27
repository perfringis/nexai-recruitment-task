import { BuildingNumber } from 'src/entity/building.number';
import { InvalidBuildingNumberException } from 'src/error/invalid.building.number.exception';

describe('BuildingNumber Test', () => {
  test('should create building number instance', () => {
    //when
    const buildingNumber: BuildingNumber = new BuildingNumber('1');

    // then
    expect(buildingNumber.asString()).toEqual('1');
  });

  test('should not create building number when value is zero', () => {
    // expect
    expect(() => {
      new BuildingNumber('0');
    }).toThrow(
      new InvalidBuildingNumberException(
        'Provided value cannot be zero or negative.',
      ),
    );
  });

  test('should not create building number when value is negative', () => {
    // expect
    expect(() => {
      new BuildingNumber('-1');
    }).toThrow(
      new InvalidBuildingNumberException(
        'Provided value cannot be zero or negative.',
      ),
    );
  });
});
