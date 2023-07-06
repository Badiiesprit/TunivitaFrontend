import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCentresCxComponent } from './list-centres-cx/list-centres-cx.component';
import { ShowCenterComponent } from './show-center/show-center.component';

const routes: Routes = [
  {
    path: '',
    component: ListCentresCxComponent,
    data: {
      title: 'List Centres',
    },
  },
  {
    path: 'show/:id',
    component: ShowCenterComponent,
    data: {
      title: 'Show Centres',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentresRoutingModule { }
