import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout-cx.component.html',
  styleUrls: ['./default-layout-cx.component.scss'],
})
export class DefaultLayoutCxComponent {


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
