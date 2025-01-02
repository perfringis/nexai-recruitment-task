import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export function PostalCodeValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const match = /^[0-9]{2}-[0-9]{3}$/.test(control.value);

    return of(match).pipe(
      map((valid) => (valid ? null : { postalCode: true }))
    );
  };
}
