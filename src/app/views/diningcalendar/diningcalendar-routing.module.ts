import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiningCalendarComponent } from './diningcalendar.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Daily Donations'
    },
    children: [
      {
        path: 'calendar',
        component: DiningCalendarComponent,
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
export class DiningCalendarRoutingModule {}
