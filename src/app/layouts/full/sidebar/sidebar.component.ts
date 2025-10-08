import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AccordionDirective, AccordionLinkDirective, AccordionAnchorDirective} from '../../../shared/accordion';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    standalone: true,
    imports: [
      MatListModule,
      MatIconModule,
      MatExpansionModule,
      RouterLink,
      RouterLinkActive,
      AccordionDirective,
      AccordionLinkDirective,
      AccordionAnchorDirective
    ]
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
    state: false, key: 'index23',path: 'index23', name: 'index', type: 'link', icon: 'home', items: [
      {state: false, key: 'index24',path: 'index', name: '数据库配置', type: 'link', icon: 'av_timer'},
      {state: false, key: 'deploy',path: 'deploy', name: '同步配置', type: 'link', icon: 'av_timer'},
      {state: false, key: 'login',path: 'login', name: 'login', type: 'link', icon: ''},
    ]
  },
  {state: false, key: 'help',path: 'help', name: '帮助', type: 'link', icon: 'av_timer', items: []},
  {state: false, key: 'form',path: 'form', name: '表单自定义', type: 'link', icon: 'av_timer', items: []},
  {state: false, key: 'code',path: 'code', name: '代码生成', type: 'link', icon: 'av_timer', items: []},
  {
    state: false, key: 'flowable',path: 'flowable', name: 'flowable', type: 'link', icon: 'home', items: [
      {state: false, key: 'flowableTask',path: 'flowable/flowableTask', name: '代办任务', type: 'link', icon: 'av_timer'},
      {state: false, key: 'flowableInitiateTask',path: 'flowable/flowableInitiateTask', name: '我的发起', type: 'link', icon: 'av_timer'},
      {state: false, key: 'flowableManage',path: 'flowable/flowableManage', name: '流程管理', type: 'link', icon: 'av_timer'},
    ]
  },
  {
    state: false, key: 'automation',path: 'automation', name: 'automation', type: 'link', icon: 'home', items: [
      {state: false, key: 'serverInfo',path: 'automation/serverInfo', name: '服务器信息', type: 'link', icon: 'av_timer'},
      {state: false, key: 'accountInfo',path: 'automation/accountInfo', name: '账号管理', type: 'link', icon: 'av_timer'},
      {state: false, key: 'applicationInfo',path: 'automation/applicationInfo', name: '应用', type: 'link', icon: 'av_timer'},
      {state: false, key: 'applicationLog',path: 'automation/applicationLog', name: '操作记录表', type: 'link', icon: 'av_timer'},
      {state: false, key: 'emailInfo',path: 'automation/emailInfo', name: '邮箱管理', type: 'link', icon: 'av_timer'},
      {state: false, key: 'gpuInfo',path: 'automation/gpuInfo', name: '显卡信息', type: 'link', icon: 'av_timer'},
    ]
  }
];
