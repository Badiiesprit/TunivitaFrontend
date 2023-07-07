import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ListeOfferComponent } from './liste-offer/liste-offer.component';
import { FormOfferComponent } from './form-offer/form-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';

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
  BadgeModule,




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
    CarouselModule,
    SpinnerModule,
    AlertModule,
    TooltipModule,
    BadgeModule,


  ],
  declarations: [
  ListeOfferComponent,
  FormOfferComponent,
  ShowComponent

  ]
})
export class OfferModule {
}
