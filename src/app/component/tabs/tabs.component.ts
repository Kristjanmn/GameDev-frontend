import {AfterContentInit, Component, ContentChildren, Input, QueryList} from "@angular/core";
import {TabComponent} from "./tab.component";

@Component({
  selector: 'tabs',
  template: `
    <mat-sidenav-container class="sidenav-container" [class.sidenav-container-root]="rootTabs" autosize>
      <mat-sidenav mode="side" opened>
        <mat-action-list>
          <mat-list-item *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.tab-active]="tab.active" [class.tab-closed]="!tab.active" [class.tab-global-item]="tab.globalItem && !tab.active" class="tab">{{tab.title}}</mat-list-item>
        </mat-action-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./tabs.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  @Input() rootTabs: boolean = false;   // first layer of tabs

  ngAfterContentInit(): void {
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (activeTabs.length === 0)
      this.selectTab(this.tabs.first);
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }
}
