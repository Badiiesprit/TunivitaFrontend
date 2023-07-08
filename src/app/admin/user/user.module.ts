import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// views
import { ListeComponent } from './liste/liste.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { UserModalComponent } from './user-modal/user-modal.component';
// Components Routing
import { UserRoutingModule } from './user-routing.module';

import {  NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';




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

@NgModule({
  declarations: [
    ListeComponent,
    AddComponent,
    UpdateComponent,
    UserModalComponent
  ],
  imports: [
    UserRoutingModule,
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
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,NavModule,UtilitiesModule,TabsModule,MatInputModule

  ]
})
export class UserModule { }
