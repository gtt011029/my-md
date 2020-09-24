import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import { QuestionBase } from '../../question-base';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
// import { forbiddenNameValidator } from '../../shared/forbidden-name.directive';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css'],
  providers:  [QuestionService]
})
export class FormControlComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  // validationMessage = {
  //   firstName: {
  //     required: '请填写first name',
  //     minLength: 'first name 最少为3个字符',
  //   }
  // };
  // 控件组
  // profileForm = new FormGroup({
  //   firstName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3)
  //   ]),
  //   lastName: new FormControl(''),
  // });
  name = new FormControl('Tina', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7),
    Validators.pattern('//')
  ]);

  // FormGroup 控件组
  // profileForm2 = this.fb.group({
  //   firstName: ['tina', Validators.required, Validators.minLength(3)],
  //   lastName: ['ge'],
  //   address: this.fb.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   })
  // });

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
    console.log(this.questions$);
  }

  ngOnInit() {
    // this.profileForm2.valueChanges.subscribe((data) => {
    //   this.onValueChanged(data);
    // });
  }
  getCurrentName() {
    console.log(this.name);
  }
  // changeName() {
  //   this.name.setValue('哈哈哈哈');
  // }
  // getFormControlValue() {
  //   // alert(this.profileForm);
  //   console.log(this.profileForm);
  // }
  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Nancy',
  //     lastName: 'ge',
  //   });
  // }
  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.log(this.profileForm2.status);
  // }
  // getFirst() {
  //   console.log(this.profileForm.get('firstName'));
  // }
  // onValueChanged(data?: any) {
  //   if (!this.profileForm2) {
  //     return;
  //   }
  //   const form = this.profileForm2;
  // }

}
