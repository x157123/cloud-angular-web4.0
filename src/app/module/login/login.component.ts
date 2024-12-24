import {Component} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

export interface ColumnConfig{
  writeColumn: string,
  key: boolean,
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent{

  columns: ColumnConfig[] = [{
    writeColumn: "A",
    key: false,
  },{
    writeColumn: "B",
    key: true,
  },{
    writeColumn: "C",
    key: false,
  }]



  drop(event: CdkDragDrop<{writeColumn: string; key: boolean}[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
