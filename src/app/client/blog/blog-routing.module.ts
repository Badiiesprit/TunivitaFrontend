import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {
    path: 'listBlogs',
    component: ListBlogsComponent,
    data: {
      title: 'Lister blogs',
    },
  },
  {
    path: 'show-blog/:id',
    component: BlogDetailsComponent,
    data: {
      title: 'show blog',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
