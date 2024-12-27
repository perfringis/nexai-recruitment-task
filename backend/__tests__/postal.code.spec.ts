import { PostalCode } from 'src/entity/postal.code';
import { InvalidPostalCodeException } from 'src/error/invalid.postal.code.exception';

describe('PostalCode Test', () => {
  test('should create PostalCode instance', () => {
    // when
    const postalCode: PostalCode = new PostalCode('11-222');

    // then
    expect(postalCode.asString()).toEqual('11-222');
  });

  test('should not create post code when provided input is not valid', () => {
    // expect
    expect(() => {
      new PostalCode('XX-XXX');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));

    // expect
    expect(() => {
      new PostalCode('111-22');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));

    // expect
    expect(() => {
      new PostalCode('');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));
  });

  test('should not create postal code when provided input is empty', () => {
    // expect
    expect(() => {
      new PostalCode('');
    }).toThrow(new InvalidPostalCodeException('Invalid postal code.'));
  });
});
