// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GuestComponent } from './guest.component';

// Food Kitchen Routing
import { GuestRoutingModule } from './guest-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddGuestComponent } from './add-guest.component';
import { GuestFakeService } from '../../store/guest/guest.fake.service';

@NgModule({
  imports: [
    CommonModule,
    GuestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    GuestComponent,
    AddGuestComponent
  ],
  exports: [
    GuestComponent,
    AddGuestComponent
  ],
  providers: [GuestFakeService],
})
export class GuestModule { }
