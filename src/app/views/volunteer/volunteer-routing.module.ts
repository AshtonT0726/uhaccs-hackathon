import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerComponent } from './volunteer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Volunteer'
    },
    children: [
      {
        path: '',
        redirectTo: 'me'
      },
      {
        path: 'me',
        component: VolunteerComponent,
        data: {
          title: 'Me'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerRoutingModule {}
