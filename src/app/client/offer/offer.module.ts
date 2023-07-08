import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ShowComponent } from './show/show.component';
import { ListComponent} from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'primeng/carousel';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

// Theme Routing
import { OfferRoutingModule } from './offer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule,
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
    CarouselModule,MatTooltipModule,
    MatIconModule

  ],
  declarations: [
    ListComponent,
    ShowComponent
  ]
})
export class OffreModule {
}
