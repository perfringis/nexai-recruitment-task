import { Street } from 'src/entity/street';
import { InvalidStreetException } from 'src/error/invalid.street.exception';

describe('Street Test', () => {
  test('should create street instance', () => {
    // when
    const street: Street = new Street('ul. Świętokrzyska 31/33');

    // then
    expect(street.asString()).toEqual('ul. Świętokrzyska 31/33');
  });

  test('should not create street when input value is empty', () => {
    // expect
    expect(() => {
      new Street('');
    }).toThrow(new InvalidStreetException('Street value cannot be empty.'));
  });
});
