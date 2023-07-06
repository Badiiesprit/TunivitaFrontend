import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeOfferComponent } from './liste-offer/liste-offer.component';
import { FormOfferComponent } from './form-offer/form-offer.component';
import { ShowComponent } from './show/show.component';


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
        component: ListeOfferComponent,
        data: {
          title: 'Lister Services',
        },
      },
      {
        path: 'form',
        component: FormOfferComponent,
        data: {
          title: 'form Services',
        },
      },
      {
        path: 'update/:id',
        component: FormOfferComponent,
        data: {
          title: 'update Services',
        },
      },
      {
        path: 'show/:id',
        component: ShowComponent,
        data: {
          title: 'Update Center',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
