import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    ListCentresCxComponent
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
