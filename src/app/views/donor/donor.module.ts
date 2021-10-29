// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DonorFakeService } from '../../store/donor/donor.fake.service';
import { AddDonorComponent } from './add-donor.component';
import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';


@NgModule({
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    DonorComponent,
    AddDonorComponent
  ],
  exports: [
    DonorComponent,
    AddDonorComponent
  ],
  providers: [DonorFakeService],
})
export class DonorModule { }
