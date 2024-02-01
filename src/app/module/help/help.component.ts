import {Component, ViewChild} from '@angular/core';

import { DataService } from './data.service';
import { Base } from '@component/dynamic-form/elements/base';
import { Observable } from 'rxjs';
import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-dynamic-form-',
  template: `
    <div style="height: 200px;">
      <app-dynamic-form [formList]="formList$ | async" (handleButtonClick)="handleButtonClick($event)"></app-dynamic-form>
      <button (click)="callChildMethod()">调用子组件方法</button>
    </div>
  `,
  providers:  [DataService]
})
export class HelpComponent {

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;


  formList$: Observable<Base<any>[]>;

  constructor(service: DataService) {
    this.formList$ = service.getData();
  }


  handleButtonClick(message: string): void {
    console.log('receivedMessage:', message);
  }

  callChildMethod(): void {
    if (this.dynamicFormComponent) {
      this.dynamicFormComponent.onSubmit();
    }
  }
}
