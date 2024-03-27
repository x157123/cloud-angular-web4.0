import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

/** @title Input with a custom ErrorStateMatcher */
@Component({
    selector: 'input-error-state-matcher-example',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: true,
  imports: [
    MatButton,
    MatLabel,
    MatFormField,
    MatInput
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
