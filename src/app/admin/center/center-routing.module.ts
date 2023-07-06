import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
const routes: Routes = [
  {
    path: '',
    component: ListeComponent,
    data: {
      title: 'Liste Center',
    },
  },
  {
    path: 'add',
    component: FormComponent,
    data: {
      title: 'Add Center',
    },
  },
  {
    path: 'update/:id',
    component: FormComponent,
    data: {
      title: 'Update Center',
    },
  }
  ,
  {
    path: 'show/:id',
    component: ShowComponent,
    data: {
      title: 'Update Center',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterRoutingModule { }
