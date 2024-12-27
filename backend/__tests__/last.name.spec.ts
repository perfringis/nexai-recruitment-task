import { LastName } from 'src/entity/last.name';
import { InvalidLastNameException } from 'src/error/invalid.last.name.exception';

describe('LastName Test', () => {
  test('should create Last name instance', () => {
    // when
    const lastName: LastName = new LastName('Doe');
    // then
    expect(lastName.asString()).toEqual('Doe');
  });

  test('should not create Last name when input is not valid', () => {
    // expect
    expect(() => {
      new LastName('D0e');
    }).toThrow(
      new InvalidLastNameException(
        'Provided value cannot be empty or have digits.',
      ),
    );
  });

  test('should not create Last name when input is empty', () => {
    // expect
    expect(() => {
      new LastName('');
    }).toThrow(
      new InvalidLastNameException(
        'Provided value cannot be empty or have digits.',
      ),
    );
  });
});
