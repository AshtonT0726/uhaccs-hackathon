import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitchenComponent } from './kitchen.component';
import { GroupComponent } from './group.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kitchen'
    },
    children: [
      {
        path: 'kitchen',
        component: KitchenComponent,
        data: {
          title: 'Kitchen'
        }
      },
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Group'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodKitchenRoutingModule {}
