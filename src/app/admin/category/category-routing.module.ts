import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: ListeComponent,
    data: {
      title: 'Liste Category',
    },
  },
  {
    path: 'add',
    component: FormComponent,
    data: {
      title: 'Add Category',
    },
  },
  {
    path: 'update/:id',
    component: FormComponent,
    data: {
      title: 'Update Category',
    },
  },
  {
    path: 'show/:id',
    component: ShowComponent,
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
