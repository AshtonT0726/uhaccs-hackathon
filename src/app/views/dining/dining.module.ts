// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DiningFakeServices } from '../../store/dining/dining.fake.service';
import { AddDiningComponent } from './add-dining.component';
import { DiningRoutingModule } from './dining-routing.module';
import { DiningComponent } from './dining.component';


@NgModule({
  imports: [
    CommonModule,
    DiningRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    DiningComponent,
    AddDiningComponent
  ],
  exports: [
    DiningComponent,
    AddDiningComponent
  ],
  providers: [DiningFakeServices],
})
export class DiningModule { }
