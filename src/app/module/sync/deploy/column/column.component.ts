import {AfterViewInit, Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {ColumnConfig, TableConfig} from "../edit.component";
import {MatSelectChange} from "@angular/material/select";

interface Table {
  name: string,
  column: Column[],
}

interface Column {
  "name": "org_id",
  "uni": false,
  "length": 19,
  "comment": "所属机构ID",
}

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
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {

  readTables: Table[] = [];
  writeTables: Table[] = [];

  readTableMap: Map<string,Column[]> = new Map();
  writeTableMap: Map<string,Column[]> = new Map();


  joinColumn: ColumnJoin = {
    name: '',
    type: 0,
    readTable: '',
    writeTable: '',
    keys: '',
    read: [],
    write: [],
  }

  constructor(private httpGlobalTool: HttpGlobalTool) {
  }

  /**
   * 重置
   */
  reset() {
    this.joinColumn = {
      name: '',
      type: 0,
      readTable: '',
      writeTable: '',
      keys: '',
      read: [],
      write: [],
    }
  }

  readTableSelect(ob: MatSelectChange) {
    let cols: Column[] | undefined = this.readTableMap.get(ob.value);
    if (cols != null) {
      this.joinColumn.read = [];
      for (let col of cols) {
        this.joinColumn.read.push(col.name)
      }
    }
  }
  writeTableSelect(ob: MatSelectChange){
    let cols: Column[] | undefined = this.writeTableMap.get(ob.value);
    if (cols != null) {
      this.joinColumn.write = [];
      for (let col of cols) {
        this.joinColumn.write.push(col.name)
      }
    }
  }

  getData(): TableConfig {
    const tableConfig: TableConfig = {
      name: '',
      type: 0,
      readTable: '',
      writeTable: '',
      columns: []
    }
    for (let i = 0; i < this.joinColumn.read.length; i++) {
      const columnConfig: ColumnConfig = {
        readColumn: this.joinColumn.read[i],
        writeColumn: this.joinColumn.write.length < i ? '' : this.joinColumn.write[i],
        key: true,
      };
      tableConfig.columns.push(columnConfig)
    }
    tableConfig.name = this.joinColumn.name;
    tableConfig.type = this.joinColumn.type;
    tableConfig.readTable = this.joinColumn.readTable;
    tableConfig.writeTable = this.joinColumn.writeTable;
    return tableConfig;
  }

  addItem() {
    this.joinColumn.read.push('');
    this.joinColumn.write.push('');
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

  getTableData(readConnectId:number,writeConnectId:number) {

    let param = new URLSearchParams();
    param.set('connectId', String(readConnectId));
    this.httpGlobalTool.post("/api/cloud-sync/connectConfig/getTables?", param).subscribe({
      next: (res) => {
        this.readTables =  res.data
        for(let table of this.readTables){
          this.readTableMap.set(table.name,table.column);
        }
      },
      error: (e) => {
        console.log('error:', e.error)
      },
      complete: () => {
      }
    });


    param.set('connectId', String(writeConnectId));
    this.httpGlobalTool.post("/api/cloud-sync/connectConfig/getTables?", param).subscribe({
      next: (res) => {
        this.writeTables = res.data;
        for(let table of this.writeTables){
          this.writeTableMap.set(table.name,table.column);
        }
      },
      error: (e) => {
        console.log('error:', e.error)
      },
      complete: () => {
      }
    });
  }

}
