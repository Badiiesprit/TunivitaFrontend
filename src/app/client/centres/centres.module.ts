import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentresRoutingModule } from './centres-routing.module';
import { ListCentresCxComponent } from './list-centres-cx/list-centres-cx.component';


@NgModule({
  declarations: [
    ListCentresCxComponent
  ],
  imports: [
    CommonModule,
    CentresRoutingModule
  ]
})
export class CentresModule { }
