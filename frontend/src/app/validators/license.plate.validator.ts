import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function LicensePlateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const regex = /^[A-Z]{1,3}\s?[A-Z0-9]{4,5}$/;
    const isValid = regex.test(control.value);

    return isValid ? null : { format: true };
  };
}
