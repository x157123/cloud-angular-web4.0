import {Component} from '@angular/core';
import {EditComponent, TableConfig} from "../edit.component";

@Component({
  selector: 'app-sync-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  panelOpenState = false;

  tables: TableConfig[] = [];

  constructor(private parent: EditComponent){

  }

  reset() {
    this.tables = []
  }

  add(tableConfig: TableConfig) {
    //删除数据
    for (let i = 0;i<this.tables.length;i++){
      if(this.tables[i].readTable === tableConfig.readTable){
        this.del(i)
      }
    }
    this.tables.push(tableConfig)
  }

  del(index: number) {
    this.tables.splice(index, 1)
  }

  edit(index: number) {
    let tab = this.tables[index]
    this.parent.showEditSync(tab)
  }

  getData() {
    return this.tables;
  }

  setData(tables: TableConfig[]) {
    this.tables = tables
  }
}
