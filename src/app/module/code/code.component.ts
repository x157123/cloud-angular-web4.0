import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
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
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-form-customization',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    CdkDropList,
    CdkDrag,
    MatInput,
    NgForOf,
    ReactiveFormsModule,
    AsyncPipe,
    DynamicFormComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatCardActions,
    NgIf,
    MatList,
    MatListItem,
    MatDivider,
    MatIconButton,
    MatIcon,
    MatHeaderCell,
    MatCell,
    MatCheckbox,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatSort,
  ],
  providers: [ControlService],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        maxLength: '255',
        collate: [{
          nameShow: 'id',
          queryShow: true,
          tableShow: true,
          detailShow: true,
          addShow: true
        }, {
          nameShow: 'name',
          queryShow: true,
          tableShow: true,
          detailShow: true,
          addShow: true
        }]
      }
    ];
  }

  tableList: Table[] = [];

  panelOpenState: boolean = false;

  drop($event: CdkDragDrop<Table[], any>) {
    moveItemInArray(this.tableList, $event.previousIndex, $event.currentIndex);
  }
}

export interface Table {
  name: string;
  className: string;
  label: string;
  key: string;
  style: number;
  maxLength: string;
  collate: Collate[];
}

export interface Collate {
  nameShow: string;
  queryShow: boolean;
  tableShow: boolean;
  detailShow: boolean;
  addShow: boolean;
}
