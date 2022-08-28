import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyDonationsComponent } from './dailydonations.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Donations'
    },
    children: [
      {
        path: 'calendar',
        component: DailyDonationsComponent,
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
export class DailyDonationsRoutingModule {}
