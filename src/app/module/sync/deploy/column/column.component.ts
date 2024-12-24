import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {ColumnConfig, Dict, TableConfig} from "../edit.component";
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ConnectionPositionPair, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

interface Table {
  name: string,
  column: Column[],
}

interface Column {
  name: string,
  uni: number,
  length: number,
  comment: string,
}

interface ColumnJoin {
  name: string,
  type: number,
  readTable: string,
  writeTable: string,
  keys: string[],
  read: string[];
  write: ColumnConfig[];
}

export interface ColumnConfigTmp {
  index: number,
  writeColumn: string,
  key: number,
  defaultValue: string,
  convertFun: string,
}

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.css'],
    standalone: false
})
export class ColumnComponent implements OnInit {


  @ViewChild('overlayMenuList') overlayMenuList!: TemplateRef<any>;

  overlayRef!: OverlayRef;

  readTables: Table[] = [];
  writeTables: Table[] = [];
  readTableMap: Map<string, Column[]> = new Map();
  writeTableMap: Map<string, Column[]> = new Map();

  myControl = new FormControl<string | Table>('');

  filteredOptions!: Observable<Table[]>;

  columnConfigTmp: ColumnConfigTmp = {
    index: -1,
    writeColumn: '',
    key: 0,
    defaultValue: '',
    convertFun: '',
  }

  joinColumn: ColumnJoin = {
    name: '',
    type: 0,
    readTable: '',
    writeTable: '',
    keys: [],
    read: [],
    write: [],
  }
  sourceType: Dict[] = [
    {value: '1', viewValue: 'mysql'},
    {value: '2', viewValue: 'oracle'},
    {value: '4', viewValue: 'postgresql'},
  ]

  constructor(private httpGlobalTool: HttpGlobalTool, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
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
        const columnConfig: ColumnConfig = {
          readColumn: '',
          writeColumn: col.name,
          key: col.uni ? 1 : 0,
          defaultValue: '',
          convertFun: '',
        }
        this.joinColumn.write.push(columnConfig)
      }
    } else {
      this.joinColumn.writeTable = 'newTableName'
      this.myControl.setValue(this.joinColumn.writeTable)
      for (let col of this.joinColumn.read) {
        const columnConfig: ColumnConfig = {
          readColumn: '',
          writeColumn: col,
          key: 0,
          defaultValue: '',
          convertFun: '',
        }
        this.joinColumn.write.push(columnConfig)
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
      const columnConfig: ColumnConfig = {
        readColumn: '',
        writeColumn: col.writeColumn,
        key: col.key,
        defaultValue: col.defaultValue,
        convertFun: col.convertFun,
      }
      this.joinColumn.write.push(columnConfig)
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
        writeColumn: this.joinColumn.write.length < i ? '' : this.joinColumn.write[i].writeColumn,
        key: this.joinColumn.write.length < i ? 0 : this.joinColumn.write[i].key,
        defaultValue: this.joinColumn.write.length < i ? '' : this.joinColumn.write[i].defaultValue,
        convertFun: this.joinColumn.write.length < i ? '' : this.joinColumn.write[i].convertFun,
      };
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
    const columnConfig: ColumnConfig = {
      readColumn: '',
      writeColumn: '',
      key: 0,
      defaultValue: '',
      convertFun: '',
    }
    this.joinColumn.write.push(columnConfig);
  }

  /**
   * 打开配置框
   * @param $event
   */
  displayMenu($event: MouseEvent, index: number) {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.columnConfigTmp.index = index;
      this.columnConfigTmp.key = this.joinColumn.write[index].key
      this.columnConfigTmp.convertFun = this.joinColumn.write[index].convertFun
      this.columnConfigTmp.defaultValue = this.joinColumn.write[index].defaultValue
      // 获取与 MouseEvent 关联的目标元素
      const targetElement: HTMLElement = $event.target as HTMLElement;
      // 使用 Renderer2 包装目标元素以获取 ElementRef
      const elementRef: ElementRef = new ElementRef(targetElement);
      const strategy = this.overlay
        .position()
        // .flexibleConnectedTo({ x: $event.x, y: $event.y })
        .flexibleConnectedTo(elementRef)
        .withPositions([
          new ConnectionPositionPair({originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'}),
          new ConnectionPositionPair({originX: 'start', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'}),
          new ConnectionPositionPair({originX: 'end', originY: 'bottom'}, {overlayX: 'end', overlayY: 'top'}),
          new ConnectionPositionPair({originX: 'start', originY: 'center'}, {overlayX: 'end', overlayY: 'center'})
        ]);
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        positionStrategy: strategy
      });
      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef.detach();
      });
      this.overlayRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
    }
  }


  keySelect(ob: MatSelectChange) {
    this.joinColumn.write[this.columnConfigTmp.index].key = ob.value
  }

  convertSelect(ob: MatSelectChange) {
    this.joinColumn.write[this.columnConfigTmp.index].convertFun = ob.value
  }

  defaultValueChange() {
    this.joinColumn.write[this.columnConfigTmp.index].key = this.columnConfigTmp.key
    this.joinColumn.write[this.columnConfigTmp.index].convertFun = this.columnConfigTmp.convertFun
    this.joinColumn.write[this.columnConfigTmp.index].defaultValue = this.columnConfigTmp.defaultValue
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

  dropList(event: CdkDragDrop<{
    readColumn: string;
    writeColumn: string;
    key: number;
    defaultValue: string;
    convertFun: string;
  }[]>) {
    moveItemInArray(this.joinColumn.write, event.previousIndex, event.currentIndex);
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
