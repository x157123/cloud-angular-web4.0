import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy {

  ngOnDestroy(): void {
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
  {state: false, key: 'index3',path: 'flex', name: 'flex', type: 'link', icon: 'av_timer', items: []},
  {
    state: true, key: 'index22',path: 'index22', name: 'Indexssss', type: 'link', icon: 'home', items: [
      {
        state: true, key: 'index23',path: 'index23', name: 'index', type: 'link', icon: 'home', items: [
          {state: true, key: 'index24',path: 'index', name: 'index', type: 'link', icon: 'av_timer'},
          {state: false, key: 'login',path: 'login', name: 'login', type: 'link', icon: 'av_timer'},
        ]
      }
    ]
  }
];
