import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-buttons-actions-form',
  templateUrl: './buttons-actions-form.component.html',
  styleUrls: ['./buttons-actions-form.component.scss']
})
export class ButtonsActionsFormComponent implements OnInit {

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Input() labelCancel = 'Cancelar';
  @Input() labelConfirm = 'Salvar';
  @Input() disabledAction = false;
  @Input() disabledCancel = false;
  @Input() showCancel = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelClick(): void {
    if (this.cancel) {
      this.cancel.emit();
    }
  }

  confirmClick(): void {
    if (this.confirm) {
      this.confirm.emit();
    }
  }
}
