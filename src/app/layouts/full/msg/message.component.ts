import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
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
