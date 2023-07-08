import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'
import { UpdateComponent } from './update/update.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Lister Services',
    },
  },
  {
    path: 'update',
    component: UpdateComponent,
    data: {
      title: 'Lister Services',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
