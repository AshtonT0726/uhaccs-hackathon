import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestComponent } from './guest.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Guest'
    },
    children: [
      {
        path: 'guest',
        component: GuestComponent,
        data: {
          title: 'Guest'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {}
