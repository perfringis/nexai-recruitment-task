import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function TextValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const regex = /\d+/;
    const isValid = regex.test(control.value);

    return !isValid ? null : { format: true };
  };
}
