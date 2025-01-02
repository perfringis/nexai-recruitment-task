import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export function TextValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const match = /^\d+$/.test(control.value);

    return of(match).pipe(map((valid) => (valid ? { text: true } : null)));
  };
}
