import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-box-component',
    imports: [NgStyle],
    template: `<div class="box" [ngStyle]="{'background': color}"></div>`,
    styles: [
        `
    div {
      width: 10rem;
      height: 10rem;
      padding: 5px;
      margin: 10px;
    }
  `,
    ]
})
export class BoxComponent {
  @Input() color: string | undefined;
}
