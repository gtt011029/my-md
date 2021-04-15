import { Directive } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]'
  // providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenNameDirective {

  constructor() { }

}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : {forbiddenName: {value: control.value}};
  };
}
