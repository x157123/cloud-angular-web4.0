import { Component } from '@angular/core';

import { DataService } from './data.service';
import { Base } from '@component/dynamic-form/elements/base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-dynamic-form [formList]="formList$ | async"></app-dynamic-form>
    </div>
  `,
  providers:  [DataService]
})
export class HelpComponent {
  formList$: Observable<Base<any>[]>;

  constructor(service: DataService) {
    this.formList$ = service.getData();
  }
}
