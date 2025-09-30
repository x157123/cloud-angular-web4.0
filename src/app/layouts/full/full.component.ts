import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, AfterViewInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterOutlet} from '@angular/router';
import {AppSidebarComponent} from './sidebar/sidebar.component';
import {MessageComponent} from './msg/message.component';

/** @title Responsive sidenav */
@Component({
    selector: 'app-full-layout',
    templateUrl: 'full.component.html',
    styleUrls: ['./full.component.css'],
    standalone: true,
    imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatSidenavModule,
      MatBadgeModule,
      RouterOutlet,
      AppSidebarComponent,
      MessageComponent
    ]
})
export class FullComponent implements OnDestroy, AfterViewInit {

  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("listener", this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("listener", this._mobileQueryListener);
  }

  ngAfterViewInit() {
  }
}
