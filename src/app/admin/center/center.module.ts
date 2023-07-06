

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// views
import { ListeComponent } from './liste/liste.component';
// Components Routing
import { CenterRoutingModule } from './center-routing.module';
// utils
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  SpinnerModule,
  AlertModule,
  TooltipModule,
  CarouselModule,
  BadgeModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
@NgModule({
  declarations: [
    ListeComponent,
    FormComponent,
    ShowComponent
  ],
  imports: [
    CenterRoutingModule,
    CommonModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    FormsModule,
    SpinnerModule,
    AlertModule,
    IconModule,
    TooltipModule,
    CarouselModule,
    BadgeModule
  ]
})
export class CenterModule { }
