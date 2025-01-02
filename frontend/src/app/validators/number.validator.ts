import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export function NumberValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const match = /^[A-Za-z]+$/.test(control.value);

    return of(match).pipe(map((valid) => (valid ? { number: true } : null)));
  };
}
