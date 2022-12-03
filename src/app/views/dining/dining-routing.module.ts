import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningComponent } from './dining.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dining Location'
    },
    children: [
      {
        path: 'dining',
        component: DiningComponent,
        data: {
          title: 'Dining Location'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiningRoutingModule {}
