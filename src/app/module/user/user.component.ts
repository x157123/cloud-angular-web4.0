import {Component} from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {MatButton} from "@angular/material/button";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";



/** @title Input with a custom ErrorStateMatcher */
@Component({
    selector: 'input-error-state-matcher-example',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: true,
    imports: [
        MatButton
    ]
})

export class UserComponent {

  constructor(private httpGlobalTool: HttpGlobalTool) {
  }

  queryData()  {
    let param = new URLSearchParams();
    this.httpGlobalTool.get("/api/flowable/error").subscribe({
      next: (res) => {
        this.queryData()
      },
      error: (e) => {
      },
      complete: () => {
      }
    });
  }

}
