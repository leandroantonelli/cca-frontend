import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-actions-form',
  templateUrl: './buttons-actions-form.component.html',
  styleUrls: ['./buttons-actions-form.component.scss']
})
export class ButtonsActionsFormComponent implements OnInit {

  @Input() textCancel: string;

  @Input() textAction: string;

  @Input() disabledAction = false;

  @Output() onClickCancel = new EventEmitter();

  @Output() onClickAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cancelClick() {

    this.onClickCancel.emit();

  }

  actionClick() {

    this.onClickAction.emit();

  }

}
