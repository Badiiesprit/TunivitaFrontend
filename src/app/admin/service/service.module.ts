import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ListeServiceComponent } from './liste-service/liste-service.component';
import { FormServiceComponent } from './form-service/form-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  ListGroupModule,
  SharedModule
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
    ReactiveFormsModule
  ],
  declarations: [
  ListeServiceComponent,
  FormServiceComponent
  ]
})
export class ServiceModule {
}
