import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoxComponent} from "./box";

@Component({
    selector: 'app-flex',
    templateUrl: './flex.component.html',
    styleUrls: ['./flex.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        BoxComponent
    ]
})
export class FlexComponent {
  colors = [
    'blue',
    'aquamarine',
    'yellow',
    'DarkOrchid',
    'GreenYellow',
    'DeepPink',
    'aquamarine',
    'yellow',
    'DarkOrchid',
    'GreenYellow',
    'DeepPink',
    'yellow',
    'DarkOrchid',
    'GreenYellow',
    'DeepPink',
    'aquamarine',
    'yellow',
    'DarkOrchid',
  ];
}


