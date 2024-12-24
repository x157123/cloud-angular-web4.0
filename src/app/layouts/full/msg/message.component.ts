import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    standalone: false
})
export class MessageComponent implements OnDestroy {
  ngOnDestroy(): void {
  }
}

export interface Message {
  title: string;
  subtitle: string;
  type: string;
  id: string;
}
