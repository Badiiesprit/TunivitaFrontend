import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { CentresRoutingModule } from './centres-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  ListGroupModule,
  SharedModule,
} from '@coreui/angular';

import { ListCentresCxComponent } from './list-centres-cx/list-centres-cx.component';
import { ShowCenterComponent } from './show-center/show-center.component';

@NgModule({
  declarations: [
    ListCentresCxComponent,
    ShowCenterComponent
  ],
  imports: [
    CommonModule,
    CentresRoutingModule,
    CommonModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    ButtonGroupModule,
    ButtonModule,
    DropdownModule,
    FormModule,
    FormsModule,
    ListGroupModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    NgxPaginationModule,
]
})
export class CentresModule { }
