import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import { QuestionBase } from '../../question-base';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { forbiddenNameValidator } from '../../shared/forbidden-name.directive';

export function typeIsNumber() {
  return (control) => {
    if (typeof control.value !== 'number') {
      return  {type: 'number'}; // 这边返回的是error的msg
    }
    return null;
  };
}

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  providers:  [QuestionService] // 提供者
})
export class FormControlComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  name = new FormControl('Tina', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7),
    Validators.pattern('//')
  ]);
  public profileForm = new FormGroup({
    name: new FormControl('Tina', [Validators.required,
      Validators.maxLength(6),
      Validators.pattern('^[A-Z][a-zA-Z]+'),
      forbiddenNameValidator(/^[A-Z][a-zA-Z]+/i)]),  // 自定义验证函数
    age: new FormControl(18, [Validators.required, Validators.max(25), typeIsNumber()])
  });

  constructor(private service: QuestionService) {
    this.questions$ = this.service.getQuestions();
    console.log(this.questions$);
  }
  onSubmit() {
    console.log(this.profileForm);
    console.log('submit');
  }
  getFormControlValue() {
    console.log(this.profileForm);
  }
  updateProfile() {
    // this.profileForm.setValue({name: 'aaa', age: 18}); // 这边要设置就一定全部设置吗
    this.profileForm.patchValue({name: 'Aaaa'}); // 哇哦， 这边是可以的
  }

  ngOnInit() {
  }

  getCurrentName() {
    console.log(this.name);
  }

}
