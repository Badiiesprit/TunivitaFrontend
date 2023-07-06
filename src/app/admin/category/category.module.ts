import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// views
import { ListeComponent } from './liste/liste.component';
// Components Routing
import { CategoryRoutingModule } from './category-routing.module';
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
  BadgeModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
@NgModule({
  declarations: [
    ListeComponent,
    ShowComponent,
    FormComponent
  ],
  imports: [
    CategoryRoutingModule,
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
    BadgeModule
  ]
})
export class CategoryModule { }
