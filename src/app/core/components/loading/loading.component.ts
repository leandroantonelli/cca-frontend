import {Component, OnInit} from '@angular/core';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  mode = 'indeterminate';
  value = 50;

  visible = false;
  message: string;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getEnableObservable().subscribe(enable => this.visible = enable);
    this.loadingService.getMessageObservable().subscribe(message => this.message = message);
  }

}
