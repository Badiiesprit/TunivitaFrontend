import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent} from './list/list.component';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ServiceCx',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'cards',
        component: ListComponent,
        data: {
          title: 'Lister Offres',
        },
      },
      {
        path: 'show/:id',
        component: ShowComponent,
        data: {
          title: 'Update Offre',
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
