import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm.component';

@Injectable()
export class DialogConfirmService {

  constructor(private dialog: MatDialog) {

  }

  show(title: string, message: string, width: string = '250px'): Observable<any> {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width,
      data: {
        title,
        message
      }
    });

    return dialogRef.afterClosed();
  }
}
