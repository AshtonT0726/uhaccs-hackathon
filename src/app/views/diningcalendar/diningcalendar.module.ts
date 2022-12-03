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
import { DiningDonationsFakeService } from "../../store/dining/diningcalendar.fake.service";
import { DiningFakeServices } from "../../store/dining/dining.fake.service";
import { AddDiningCalendarComponent } from "./add-diningcalendar.component";
import { CurrentDateFilter } from "./current-date-filter.component";
import { DiningCalendarRoutingModule } from "./diningcalendar-routing.module";
import { DiningCalendarComponent } from "./diningcalendar.component";

import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        DiningCalendarRoutingModule,
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
    declarations: [DiningCalendarComponent, AddDiningCalendarComponent, CurrentDateFilter],
    exports: [DiningCalendarComponent, AddDiningCalendarComponent, CurrentDateFilter],
    providers: [DiningFakeServices, DiningDonationsFakeService]
})
export class DiningCalendarModule {}
