import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListServiceCxComponent} from './list-service-cx/list-service-cx.component';
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
        component: ListServiceCxComponent,
        data: {
          title: 'Lister Services',
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
export class ServiceRoutingModule {}
