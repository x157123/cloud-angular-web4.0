import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

interface ColumnJoin {
  name: string,
  type: number,
  readTable: string,
  writeTable: string,
  keys: string,
  read: string[];
  write: string[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  joinColumn: ColumnJoin = {
    name: '',
    type: 0,
    readTable: '',
    writeTable: '',
    keys: '',
    read: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    write: ['Item 11', 'Item 21', 'Item 31', ''],
  }


  addItem() {
    this.joinColumn.read.push('');
  }

  showItem() {
    console.log(this.joinColumn)
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
