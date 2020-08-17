import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ErrorFormService {

  constructor() {
  }

  getMessageError(objFormControl: FormControl): string {

    if (objFormControl.hasError('required')) {
      return 'Campo Obrigatório';
    } else if (objFormControl.hasError('cpfInvalido')) {
      return 'CPF informado é inválido';
    } else if (objFormControl.hasError('email')) {
      return 'E-mail informado é inválido';
    } else if (objFormControl.hasError('minlength')) {
      return 'O Campo deve ter pelo menos ' + objFormControl.errors.minlength.requiredLength + ' caracteres';
    }

    return '';

  }
  
}
