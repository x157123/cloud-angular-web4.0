import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {ColumnConfig, TableConfig} from "../edit.component";
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

interface Table {
  name: string,
  column: Column[],
}

interface Column {
  "name": string,
  "uni": boolean,
  "length": number,
  "comment": string,
}

interface ColumnJoin {
  name: string,
  type: number,
  readTable: string,
  writeTable: string,
  keys: string[],
  read: string[];
  write: string[];
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  readTables: Table[] = [];
  writeTables: Table[] = [];
  readTableMap: Map<string, Column[]> = new Map();
  writeTableMap: Map<string, Column[]> = new Map();
  checks: boolean[] = [];

  myControl = new FormControl<string | Table>('');

  // @ts-ignore
  filteredOptions: Observable<Table[]>;

  joinColumn: ColumnJoin = {
    name: '',
    type: 0,
    readTable: '',
    writeTable: '',
    keys: [],
    read: [],
    write: [],
  }

  constructor(private httpGlobalTool: HttpGlobalTool) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.writeTables.slice();
      }),
    );
  }

  private _filter(name: string): Table[] {
    this.joinColumn.writeTable = name
    const filterValue = name.toLowerCase();
    return this.writeTables.filter(option => option.name.toLowerCase().includes(filterValue));
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
      keys: [],
      read: [],
      write: [],
    }
    this.checks = []
    this.myControl.setValue('')
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

  writeTableSelect(ob: MatAutocompleteSelectedEvent) {
    let cols: Column[] | undefined = this.writeTableMap.get(ob.option.viewValue);
    this.joinColumn.write = [];
    if (cols != null && cols.length > 0) {
      this.joinColumn.writeTable = ob.option.viewValue
      for (let col of cols) {
        this.joinColumn.write.push(col.name)
      }
    } else {
      this.joinColumn.writeTable = 'newTableName'
      this.myControl.setValue(this.joinColumn.writeTable)
      for (let col of this.joinColumn.read) {
        this.joinColumn.write.push(col)
      }
    }
  }

  setData(tableConfig: TableConfig) {
    console.log(tableConfig)
    this.reset()
    this.joinColumn.name = tableConfig.name
    this.joinColumn.readTable = tableConfig.readTable
    this.joinColumn.writeTable = tableConfig.writeTable
    let i = 0;
    for (let col of tableConfig.columns) {
      this.joinColumn.read.push(col.readColumn)
      this.joinColumn.write.push(col.writeColumn)
      this.checks[i++] = col.key
      if (col.key) {
        this.joinColumn.keys.push(col.writeColumn)
      }
    }
    this.myControl.setValue(this.joinColumn.writeTable)
  }

  getData(): TableConfig {
    const tableConfig: TableConfig = {
      name: '',
      type: 0,
      readTable: '',
      writeTable: '',
      columns: []
    }
    console.log(this.joinColumn.keys)
    for (let i = 0; i < this.joinColumn.read.length; i++) {
      const columnConfig: ColumnConfig = {
        readColumn: this.joinColumn.read[i],
        writeColumn: this.joinColumn.write.length < i ? '' : this.joinColumn.write[i],
        key: false,
      };
      columnConfig.key = this.joinColumn.keys.indexOf(columnConfig.writeColumn) > -1 ? true : false
      tableConfig.columns.push(columnConfig)
    }
    tableConfig.name = this.joinColumn.name;
    tableConfig.type = this.joinColumn.type;
    tableConfig.readTable = this.joinColumn.readTable;
    tableConfig.writeTable = this.joinColumn.writeTable;
    console.log(tableConfig)
    return tableConfig;
  }

  handleCheckboxChange(obj: MatCheckboxChange) {
    const index = this.joinColumn.keys.indexOf(obj.source.value);
    if (index > -1) {
      this.joinColumn.keys.splice(index, 1);
    }
    if (obj.checked) {
      this.joinColumn.keys.push(obj.source.value)
    }
  }

  addItem() {
    this.joinColumn.read.push('');
    this.joinColumn.write.push('');
  }

  showItem() {

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

  getTableData(readConnectId: number, writeConnectId: number) {
    let param = new URLSearchParams();
    param.set('connectId', String(readConnectId));
    this.httpGlobalTool.post("/api/cloud-sync/connectConfig/getTables?", param).subscribe({
      next: (res) => {
        this.readTables = res.data
        for (let table of this.readTables) {
          this.readTableMap.set(table.name, table.column);
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
        let tmpTable: Table = {
          name: "新建表",
          column: []
        };
        this.writeTables.push(tmpTable);
        for (let table of this.writeTables) {
          this.writeTableMap.set(table.name, table.column);
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
