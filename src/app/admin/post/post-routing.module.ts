import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPostComponent } from './form-post/form-post.component';
import { ListPostComponent } from './list-post/list-post.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Post',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lister',
      },
      {
        path: 'lister',
        component: ListPostComponent,
        data: {
          title: 'Lister Posts',
        },
      },
      {
        path: 'form',
        component: FormPostComponent,
        data: {
          title: 'form Posts',
        },
      },
      {
        path: 'update/:id',
        component: FormPostComponent,
        data: {
          title: 'update Posts',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
