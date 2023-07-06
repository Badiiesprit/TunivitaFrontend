import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { FormPostComponent } from './form-post/form-post.component';
import { ListPostComponent } from './list-post/list-post.component';
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
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
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
    FormPostComponent,
    ListPostComponent
  ]
})
export class PostModule {
}
