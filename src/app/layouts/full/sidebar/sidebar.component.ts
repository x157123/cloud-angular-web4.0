import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy {

  ngOnDestroy(): void {
  }

  openSp(): void {
    console.log("xxxxxxxxxxx")
  }

  getMenuitem(): Menu[] {
    return menuItems;
  }
}

export interface Menu {
  state: boolean;
  name: string;
  key: string;
  path: string;
  type: string;
  icon: string;
  items?: Menu[];
}

const menuItems = [
  {state: false, key: 'index1',path: 'user', name: 'User', type: 'link', icon: 'av_timer', items: []},
  {state: false, key: 'index2',path: 'index', name: 'index', type: 'link', icon: 'av_timer', items: []},
  {state: false, key: 'index3',path: 'flex', name: 'flex', type: 'link', icon: 'av_timer', items: []},
  {
    state: true, key: 'index4',path: 'index', name: 'Indexs', type: 'link', icon: 'home', items: [
      {state: false, key: 'index5',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
      {state: true, key: 'index6',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
    ]
  },
  {
    state: false, key: 'index7',path: 'index', name: 'Indexss', type: 'link', icon: 'home', items: [
      {state: false, key: 'index8',path: 'index', name: 'index0', type: 'link', icon: 'av_timer'},
      {
        state: false, key: 'index9',path: 'index', name: 'index', type: 'link', icon: 'home', items: [
          {state: false, key: 'index10',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index11',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
        ]
      },
      {
        state: false, key: 'index12',path: 'index', name: 'Index2', type: 'link', icon: 'home', items: [
          {state: false, key: 'index13',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index14',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
        ]
      },
    ]
  },
  {
    state: false, key: 'index15',path: 'index', name: 'Indexsss', type: 'link', icon: 'home', items: [
      {
        state: false, key: 'index16',path: 'index', name: 'index', type: 'link', icon: 'home', items: [
          {state: false, key: 'index17',path: 'index', name: 'indexeeeeeeeeeeeeeeeeeeeeeeeeeeeee', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index18',path: 'index', name: 'Index2rrrrrrrrrrrrrrrrr', type: 'link', icon: 'av_timer'},
        ]
      },
      {
        state: false, key: 'index19',path: 'index', name: 'Index2', type: 'link', icon: 'home', items: [
          {state: false, key: 'index20',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index21',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
        ]
      },
    ]
  },
  {
    state: false, key: 'index22',path: 'index', name: 'Indexssss', type: 'link', icon: 'home', items: [
      {
        state: false, key: 'index23',path: 'index', name: 'index', type: 'link', icon: 'home', items: [
          {state: false, key: 'index24',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index25',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
        ]
      },
      {
        state: false, key: 'index26',path: 'index', name: 'Index2', type: 'link', icon: 'home', items: [
          {state: false, key: 'index27',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'index28',path: 'index', name: 'Index2', type: 'link', icon: 'av_timer'},
        ]
      },
    ]
  }
];
