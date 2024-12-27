import { Email } from 'src/entity/email';
import { InvalidEmailException } from 'src/error/invalid.email.exception';

describe('Email Test', () => {
  test('should create email instance', () => {
    // when
    const email: Email = Email.of('test@test.com');
    // then
    expect(email.asString()).toEqual('test@test.com');
  });

  test('should not create email when provided input is not valid', () => {
    // expect
    expect(() => {
      Email.of('bad.email.address');
    }).toThrow(new InvalidEmailException('Invalid email address!'));
  });
});
