import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeServiceComponent } from './liste-service/liste-service.component';
import { FormServiceComponent } from './form-service/form-service.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Service',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lister',
      },
      {
        path: 'lister',
        component: ListeServiceComponent,
        data: {
          title: 'Lister Services',
        },
      },
      {
        path: 'form',
        component: FormServiceComponent,
        data: {
          title: 'form Services',
        },
      },
      {
        path: 'update/:id',
        component: FormServiceComponent,
        data: {
          title: 'update Services',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
