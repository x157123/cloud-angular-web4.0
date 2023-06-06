import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-view',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {

  constructor() { }

  dataSource: any;

  displayedColumns = ['id', 'name', 'age', 'gender', 'country'];
  rows = [
    {
      id: '1',
      name: 'John',
      age: '21',
      gender: 'Male',
      country: 'UK'
    },
    {
      id: '2',
      name: 'Robin',
      age: '25',
      gender: 'Male',
      country: 'London'
    },
    {
      id: '3',
      name: 'Robert',
      age: '12',
      gender: 'Male',
      country: 'Dubai'
    },
    {
      id: '4',
      name: 'Neeraj',
      age: '23',
      gender: 'Male',
      country: 'India'
    },
    {
      id: '5',
      name: 'Wiliiams',
      age: '30',
      gender: 'Male',
      country: 'Ausralia'
    }
  ];

  columns: any[] = [
    {
      name: 'id',
      title: 'No.'
    },
    {
      name: 'name',
      title: 'Name'
    },
    {
      name: 'age',
      title: 'Age'
    },
    {
      name: 'gender',
      title: 'Gender'
    },
    {
      name: 'country',
      title: 'Country'
    }
  ];
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.rows);
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    console.log(event);

  }
}
