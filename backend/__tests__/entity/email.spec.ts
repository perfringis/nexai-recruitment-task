import { BadRequestException } from '@nestjs/common';
import { Email } from 'src/value-object/email';

describe('Email Test', () => {
  test('should create email instance', () => {
    // when
    const email: Email = new Email('test@test.com');
    // then
    expect(email.toString()).toEqual('test@test.com');
  });

  test('should not create email when provided input is not valid', () => {
    // expect
    expect(() => {
      new Email('bad.email.address');
    }).toThrow(
      new BadRequestException('Email is empty or has no valid format.'),
    );
  });

  test('should not create email when provided input is empty', () => {
    // expect
    expect(() => {
      new Email('');
    }).toThrow(
      new BadRequestException('Email is empty or has no valid format.'),
    );
  });
});
