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
import { DailyNeedsFakeService } from "../../store/needs/dailyneeds.fake.service";
import { DailyNeedsService } from "../../store/needs/dailyneeds.service";
import { AddDailyNeedComponent } from "./add-dailyneed.component";
import { CurrentDateFilter } from "./current-date-filter.component";
import { DailyNeedsRoutingModule } from "./dailyneeds-routing.module";
import { DailyNeedsComponent } from "./dailyneeds.component";

import { MatInputModule } from "@angular/material/input";
import { KitchenFakeService } from "../../store/kitchen/kitchen.fake.service";
import { VolunteerFakeService } from "../../store/volunteer/volunteer.fake.service";
import { NotificationFakeService } from "../../store/notification/notification.fake.service";

@NgModule({
  imports: [
    CommonModule,
    DailyNeedsRoutingModule,
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
  declarations: [DailyNeedsComponent, AddDailyNeedComponent, CurrentDateFilter],
  exports: [DailyNeedsComponent, AddDailyNeedComponent, CurrentDateFilter],
  entryComponents: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    DailyNeedsService,
    DailyNeedsFakeService,
  ],
})
export class DailyNeedsModule {}
