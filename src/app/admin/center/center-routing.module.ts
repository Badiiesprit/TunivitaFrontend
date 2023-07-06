import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { FormComponent } from './form/form.component';
import { ShowComponent } from './show/show.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Liste Center',
    },
  },
  {
    path: 'add',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Add Center',
    },
  },
  {
    path: 'update/:id',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Update Center',
    },
  }
  ,
  {
    path: 'show/:id',
    component: ShowComponent,
    canActivate: [AuthGuard],
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
