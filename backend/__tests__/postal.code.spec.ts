import { PostalCode } from 'src/entity/postal.code';
import { InvalidPostalCodeException } from 'src/error/invalid.postal.code.exception';

describe('PostalCode Test', () => {
  test('should create PostalCode instance', () => {
    // when
    const postalCode: PostalCode = PostalCode.of('11-222');

    // then
    expect(postalCode.asString()).toEqual('11-222');
  });

  test('should not create post code when provided input is not valid', () => {
    // expect
    expect(() => {
      PostalCode.of('XX-XXX');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));

    // expect
    expect(() => {
      PostalCode.of('111-22');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));

    // expect
    expect(() => {
      PostalCode.of('');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));
  });

  test('should not create postal code when provided input is empty', () => {
    // expect
    expect(() => {
      PostalCode.of('');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));
  });
});
