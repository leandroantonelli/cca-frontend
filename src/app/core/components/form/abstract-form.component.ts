import { Component } from '@angular/core';
import { ErrorFormService } from './service/error-form.service';
import { FormControl } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-abstract-form',
  template: ''
})
export class AbstractFormComponent {

  errorFormService: ErrorFormService;

  constructor() {
    this.errorFormService = new ErrorFormService();
  }

  getMessageError(objFormControl: FormControl): string {
    return this.errorFormService.getMessageError(objFormControl);
  }

  nextStepper(stepper: MatHorizontalStepper) {
    stepper.next();
  }

  previousStepper(stepper: MatHorizontalStepper) {
    stepper.previous();
  }
}
