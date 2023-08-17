import {Component} from '@angular/core';
import {TableConfig} from "../edit.component";

@Component({
  selector: 'app-sync-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  panelOpenState = false;

  tables: TableConfig[] = [];

  add(tableConfig: TableConfig) {
    this.tables.push(tableConfig)
  }

  del(index: number) {
    this.tables.splice(index, 1)
  }

  edit(index: number) {
    this.tables[index]
  }

  getData() {
    return this.tables;
  }

  setData(tables: TableConfig[]) {
    this.tables = tables
  }
}
