import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {

  menus : Menu[] = [];

  ngOnInit() {
    this.menus = this.getMenuitem();
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
    state: false, key: 'index22',path: 'index22', name: 'Indexssss', type: 'link', icon: 'home', items: [
      {
        state: false, key: 'index23',path: 'index23', name: 'index', type: 'link', icon: 'home', items: [
          {state: false, key: 'index24',path: 'index', name: '数据库配置', type: 'link', icon: 'av_timer'},
          {state: false, key: 'deploy',path: 'deploy', name: '同步配置', type: 'link', icon: 'av_timer'},
          {state: false, key: 'login',path: 'login', name: 'login', type: 'link', icon: ''},
        ]
      }
    ]
  },
  {state: false, key: 'help',path: 'help', name: '帮助', type: 'link', icon: 'av_timer', items: []},
  {state: false, key: 'form',path: 'form', name: '表单自定义', type: 'link', icon: 'av_timer', items: []},
  {
    state: false, key: 'flowable',path: 'flowable', name: 'flowable', type: 'link', icon: 'home', items: [
      {state: false, key: 'flowableTask',path: 'flowable/flowableTask', name: '代办任务', type: 'link', icon: 'av_timer'},
      {state: false, key: 'flowableInitiateTask',path: 'flowable/flowableInitiateTask', name: '我的发起', type: 'link', icon: 'av_timer'},
      {state: false, key: 'flowableManage',path: 'flowable/flowableManage', name: '流程管理', type: 'link', icon: 'av_timer'},
    ]
  }
];
