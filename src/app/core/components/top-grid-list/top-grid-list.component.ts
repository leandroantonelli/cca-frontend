import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-grid-list',
  templateUrl: './top-grid-list.component.html',
  styleUrls: ['./top-grid-list.component.scss']
})
export class TopGridListComponent implements OnInit {

  @Input() titleMenu: string;

  @Input() titleButton: string;

  @Output() onClickButton = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addClick() {

    this.onClickButton.emit();

  }

}
