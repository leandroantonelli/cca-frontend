import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private subjectMessage = new Subject<string>();
  private subjectEnable = new Subject<boolean>();

  getMessageObservable(): Observable<string> {
    return this.subjectMessage;
  }

  getEnableObservable(): Observable<boolean> {
    return this.subjectEnable;
  }

  updateMessage(message: string) {
    this.subjectMessage.next(message);
  }

  start(message: string) {
    this.updateMessage(message);
    this.subjectEnable.next(true);
  }

  done() {
    this.updateMessage('');
    this.subjectEnable.next(false);
  }

}
