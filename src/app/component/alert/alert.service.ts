import {Component, Injectable} from '@angular/core';
// 引入官方组件
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public _snackBar: MatSnackBar) {
  }
  success(msg: string) {
    this._snackBar.open(msg, '关闭', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass:['mat-mdc-snack-bar-container-success']
    })
  }

  error(msg: string) {
    this._snackBar.open(msg, '关闭', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass:['mat-mdc-snack-bar-container-error']
    })
  }

  warning(msg: string) {
    this._snackBar.open(msg, '关闭', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass:['mat-mdc-snack-bar-container-error']
    })
  }
}

@Component({
  selector: 'error-snack',
  templateUrl: 'error.html',
  styles: [
    `
      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
  standalone: true,
})
export class ErrorComponent {

  mess: String = 'String33';

}
