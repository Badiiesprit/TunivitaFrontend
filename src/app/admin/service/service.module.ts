import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ListeServiceComponent } from './liste-service/liste-service.component';
import { FormServiceComponent } from './form-service/form-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  ListGroupModule,
  SharedModule,
  CarouselModule,
  SpinnerModule,
  AlertModule,
  TooltipModule,
  BadgeModule

} from '@coreui/angular';

// Theme Routing
import { ServiceRoutingModule } from './service-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ServiceRoutingModule,
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
    CarouselModule,
    SpinnerModule,
    AlertModule,
    TooltipModule,
    BadgeModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  declarations: [
  ListeServiceComponent,
  FormServiceComponent,
  ShowComponent

  ]
})
export class ServiceModule {
}
