import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyNeedsComponent } from './dailyneeds.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Needs'
    },
    children: [
      {
        path: '',
        redirectTo: 'calendar'
      },
      {
        path: 'calendar',
        component: DailyNeedsComponent,
        data: {
          title: 'Calendar'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyNeedsRoutingModule {}
