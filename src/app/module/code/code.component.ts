import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";
import {ControlService} from "@component/dynamic-form/elements/control.service";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-form-customization',
  imports: [
    MatInput,
    NgForOf,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatHeaderCell,
    MatCell,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatSort,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
  ],
  providers: [ControlService],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CodeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.tableList = [
      {
        name: 'name',
        className: 'form-control',
        label: '名称',
        key: 'name',
        style: 1,
        pack: 'com.xxx',
        collate: [{
          nameShow: 'id',
          required: false,
          queryShow: true,
          tableShow: true,
          detailShow: true,
          addShow: true,
          keyword: true
        }, {
          nameShow: 'name',
          required: true,
          queryShow: true,
          tableShow: true,
          detailShow: false,
          addShow: true,
          keyword: true
        }]
      },
      {
        name: 'name11',
        className: 'form-control',
        label: '名称11',
        key: 'name11',
        style: 1,
        pack: 'com.xxss',
        collate: [{
          nameShow: 'id2',
          required: true,
          queryShow: true,
          tableShow: true,
          detailShow: true,
          addShow: true,
          keyword: true
        }, {
          nameShow: 'name33',
          required: true,
          queryShow: true,
          tableShow: false,
          detailShow: false,
          addShow: false,
          keyword: false
        }]
      }
    ];
  }

  displayedColumns: string[] = ['nameShow', 'queryShow', 'tableShow', 'detailShow', 'addShow', 'keyword'];

  tableList: Table[] = [];

  panelOpenState: boolean = false;

  create() {
    console.log("--->" + JSON.stringify(this.tableList));
  }
}

export interface Table {
  name: string;
  className: string;
  label: string;
  key: string;
  pack: string;
  style: number;
  collate: Collate[];
}

export interface Collate {
  nameShow: string;
  required: boolean;
  queryShow: boolean;
  tableShow: boolean;
  detailShow: boolean;
  addShow: boolean;
  keyword: boolean;
}
