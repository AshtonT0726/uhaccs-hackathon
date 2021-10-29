// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificationFakeService } from '../../store/notification/notification.fake.service';
import { VolunteerFakeService } from '../../store/volunteer/volunteer.fake.service';
// Food Kitchen Routing
import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerComponent } from './volunteer.component';



@NgModule({
  imports: [
    CommonModule,
    VolunteerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  declarations: [
    VolunteerComponent
  ],
  exports: [
    VolunteerComponent
  ],
  providers: [VolunteerFakeService],
})
export class VolunteerModule { }
