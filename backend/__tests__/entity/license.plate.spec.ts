import { LicensePlate } from 'src/entity/license.plate';
import { InvalidLicensePlateException } from 'src/error/invalid.license.plate.exception';

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
    }).toThrow(
      new InvalidLicensePlateException('Provide value is empty or not valid.'),
    );
  });

  test('should not create instance of license plate when value is missing', () => {
    // expect
    expect(() => {
      new LicensePlate('');
    }).toThrow(
      new InvalidLicensePlateException('Provide value is empty or not valid.'),
    );
  });
});
