import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { VIN } from 'src/value-object/vin';

@ValidatorConstraint({ async: false })
export class IsVINConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    try {
      new VIN(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(): string {
    return 'VIN must be a 17-character string excluding I, O, Q, and adhere to the required format.';
  }
}

export function IsVIN(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVINConstraint,
    });
  };
}
