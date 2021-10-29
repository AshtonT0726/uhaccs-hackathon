import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorComponent } from './donor.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Food Donor'
    },
    children: [
      {
        path: '',
        redirectTo: 'donor'
      },
      {
        path: 'donor',
        component: DonorComponent,
        data: {
          title: 'Donor'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule {}
