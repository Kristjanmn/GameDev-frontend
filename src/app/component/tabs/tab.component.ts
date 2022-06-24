import {Component, Input} from "@angular/core";

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active" class="tab-pane">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.scss'],
})
export class TabComponent {

  @Input('tabTitle') title: string = "";
  @Input() active: boolean = false;
  @Input() globalItem: boolean = false;
}
