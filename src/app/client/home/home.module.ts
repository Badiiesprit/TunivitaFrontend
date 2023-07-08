import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from "./home.component";

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
  BadgeModule
} from '@coreui/angular';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
  ]
})
export class HomeModule { }
