import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function VINValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const regex = /^[A-HJ-NPR-Z0-9]{17}$/;
    const isValid = regex.test(control.value);

    return isValid ? null : { format: true };
  };
}
