import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Liste Category',
    },
  },
  {
    path: 'add',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Add Category',
    },
  },
  {
    path: 'update/:id',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Update Category',
    },
  },
  {
    path: 'show/:id',
    component: ShowComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Show Category',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
