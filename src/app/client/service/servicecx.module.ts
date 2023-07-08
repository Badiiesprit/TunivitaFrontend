import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ShowComponent } from './show/show.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ListServiceCxComponent} from './list-service-cx/list-service-cx.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  ListGroupModule,
  SharedModule,
} from '@coreui/angular';

// Theme Routing
import { ServiceRoutingModule } from './servicecx-routing.module';

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
    MatGridListModule,
    MatCardModule,
    NgxPaginationModule,
    MatIconModule,MatTooltipModule

  ],
  declarations: [
    ListServiceCxComponent,
    ShowComponent
  ]
})
export class ServiceCxModule {
}
