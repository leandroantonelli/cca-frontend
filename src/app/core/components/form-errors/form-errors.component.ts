import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input() fieldText: string;

  @Input() objFormControl: FormControl;

  constructor() {
  }

  ngOnInit(): void {
  }

  checkError(type: string): boolean {
    return this.objFormControl.hasError(type);
  }

  getLength(type: string): string {

    console.log(this.objFormControl);

    return '';
  }
}
