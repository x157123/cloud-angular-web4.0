import {Component} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  CdkDrag
} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';

export interface ColumnConfig{
  writeColumn: string,
  key: boolean,
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      CdkDropList,
      CdkDrag
    ]
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
