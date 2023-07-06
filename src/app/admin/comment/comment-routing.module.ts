import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommentComponent } from './list-comment/list-comment.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Comment',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lister',
      },
      {
        path: 'lister',
        component: ListCommentComponent,
        data: {
          title: 'Lister Comments',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
