// Angular
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FlatpickrModule } from "angularx-flatpickr";
import { DailyDonationsFakeService } from "../../store/donations/dailydonations.fake.service";
import { DailyDonationsService } from "../../store/donations/dailydonations.service";
import { AddDailyDonationComponent } from "./add-dailydonation.component";
import { CurrentDateFilter } from "./current-date-filter.component";
import { DailyDonationsRoutingModule } from "./dailydonations-routing.module";
import { DailyDonationsComponent } from "./dailydonations.component";

import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    DailyDonationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [DailyDonationsComponent, AddDailyDonationComponent, CurrentDateFilter],
  exports: [DailyDonationsComponent, AddDailyDonationComponent, CurrentDateFilter],
  entryComponents: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [DailyDonationsService, DailyDonationsFakeService],
})
export class DailyDonationsModule {}
