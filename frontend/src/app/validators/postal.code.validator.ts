import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PostalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const regex = /^[0-9]{2}-[0-9]{3}$/;
    const isValid = regex.test(control.value);

    return isValid ? null : { format: true };
  };
}
