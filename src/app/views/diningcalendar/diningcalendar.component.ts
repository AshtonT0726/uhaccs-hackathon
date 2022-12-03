import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import {
  addDays,
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay,
} from "date-fns";
import { Observable } from "rxjs";
import { colors } from "../../core/model/constants";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddDiningCalendarComponent } from "./add-diningcalendar.component";
//import { ThrowStmt } from "@angular/compiler";
import { ActivatedRoute } from "@angular/router";
import { ashton } from "../../core/model/guest-constants"
import { DiningDonation } from "../../core/model/dining-donation";
import { DiningDonationsFakeService } from "../../store/dining/diningcalendar.fake.service";

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["diningcalendar.styles.css"],
  templateUrl: "diningcalendar.component.html",
})
export class DiningCalendarComponent implements OnInit {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  datePipe = new DatePipe("en-US");

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  donationComplete: Boolean;

  // TODO: Fix name
  selectedHostName: string = ashton.name;
  selectedHostId: number = 1;
  selectedDate: string;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: "Edit",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // TODO: handle edit
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: "Delete",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // TODO: handle delete
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent("Deleted", event);
      },
    },
  ];

  events: CalendarEvent[];

  activeDayIsOpen: boolean = true;

  diningDonations: Observable<DiningDonation[]>;

  constructor(
    private modal: NgbModal,
    private diningDonationService: DiningDonationsFakeService,
    private changeDetectorRefs: ChangeDetectorRef,
    private matDialog: MatDialog,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.diningDonations = this.diningDonationService.getByDate(
      "any"
    );
    this.diningDonations.subscribe((donations) => {
      this.events = this.fromDiningDonationsToEvents(donations);
    });

    this.setDateView();

    this.activatedRouter.paramMap.subscribe((params) => {
      this.selectedHostId = Number(params.get("id"))
        ? Number(params.get("id"))
        : 1;
      this.selectedHostName = String(params.get("name"));
      if (this.selectedHostName === 'null') {
        this.selectedHostName = ashton.name;
      }
      // TODO fix name
        this.selectedDate = String(params.get("date"));
      // TODO fix any.
      this.diningDonations = this.diningDonationService.getByMonth(
        "any"
      );
      this.diningDonations.subscribe((donations) => {
        this.events = this.fromDiningDonationsToEvents(donations);
      });
      this.setDateView();
    });

    this.changeDetectorRefs.detectChanges();
    this.activeDayIsOpen = false;
  }

  setDateView() {
    if (this.selectedDate && this.selectedDate !== 'null') {
      this.view = CalendarView.Day;
      this.viewDate = addDays(new Date(this.selectedDate), 1);
    }
  }

  refresh() {
    console.log("refresh");

    this.diningDonations = this.diningDonationService.getByMonth(
      "any"
    );
    this.diningDonations.subscribe((donations) => {
      this.events = this.fromDiningDonationsToEvents(donations);
    });

    this.isCompleted();
    this.changeDetectorRefs.detectChanges();
  }

  fromDiningDonationToEvent(donation: DiningDonation): CalendarEvent {
    let calendarEvent = {
      start: addDays(new Date(donation.date), 1),
      end: addDays(new Date(donation.date), 1),
      title: donation.location + " - " + donation.meal,
      color: donation.color,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: donation.date,
    } as CalendarEvent;
    return calendarEvent;
  }

  fromDiningDonationsToEvents(donations: DiningDonation[]): CalendarEvent[] {
    return donations.map((donation) => this.fromDiningDonationToEvent(donation));
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log("day clicked", date);

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    this.refresh();
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log("eventTimesChanged");
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log("handleEvent ", action);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    console.log("addEvent");
    this.events = [
      ...this.events,
      {
        title: "New event",
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  addDonationDialog() {
    console.log("addDonationDialog");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { location: "Busch", meal: "Breakfast" };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(
      AddDiningCalendarComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result: DiningDonation) => {
      result.date = this.getViewDateStr();
      console.log("Dialog result:", result);
      this.addDonation(result);
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addDonation(donationToAdd: DiningDonation) {
    // Hardcode pantry Id as 1.
    this.diningDonationService.createDiningDonation(donationToAdd);
    this.refresh();
  }

  deleteDonation(donationToDelete: DiningDonation) {
    this.diningDonationService.deleteDiningDonation(
      donationToDelete.id
    );
    this.refresh();
  }

  updateDonation(donationToUpdate: DiningDonation) {
    console.log("update ", donationToUpdate);
    this.diningDonationService.updateDiningDonation(
      donationToUpdate
    );
    this.refresh();
  }

  setView(view: CalendarView) {
    this.view = view;
    this.refresh();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getViewDateStr() {
    return this.datePipe.transform(this.viewDate, "yyyy-MM-dd");
  }

  isCompleted() {
    this.diningDonationService
      .getStatusByDate(this.getViewDateStr())
      .subscribe((s) => {
        console.log("s", s);
        return (this.donationComplete = s === "Completed");
      });
    console.log("donationComplete", this.donationComplete);
    return this.donationComplete;
  }
}
