import { BadRequestException } from '@nestjs/common';
import { Street } from 'src/value-object/street';

describe('Street Test', () => {
  test('should create street instance', () => {
    // when
    const street: Street = new Street('ul. Świętokrzyska 31/33');

    // then
    expect(street.toString()).toEqual('ul. Świętokrzyska 31/33');
  });

  test('should not create street when input value is empty', () => {
    // expect
    expect(() => {
      new Street('');
    }).toThrow(new BadRequestException('Street cannot be empty.'));
  });
});
