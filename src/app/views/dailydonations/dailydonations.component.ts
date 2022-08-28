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
import { DailyDonation } from "../../core/model/daily-donation";
import { DailyDonationsFakeService } from "../../store/donations/dailydonations.fake.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddDailyDonationComponent } from "./add-dailydonation.component";
//import { ThrowStmt } from "@angular/compiler";
import { panera } from "../../core/model/donor-constants";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["dailydonations.styles.css"],
  templateUrl: "dailydonations.component.html",
})
export class DailyDonationsComponent implements OnInit {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  datePipe = new DatePipe("en-US");

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  donationComplete: Boolean;

  selectedDonorName: string = panera.name;
  selectedDonorId: number = panera.id;
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

  dailyDonations: Observable<DailyDonation[]>;

  constructor(
    private modal: NgbModal,
    private dailyDonationsService: DailyDonationsFakeService,
    private changeDetectorRefs: ChangeDetectorRef,
    private matDialog: MatDialog,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.dailyDonations = this.dailyDonationsService.getByDonorIdAndMonth(
      this.selectedDonorId,
      "any"
    );
    this.dailyDonations.subscribe((donations) => {
      this.events = this.fromDailyDonationsToEvents(donations);
    });

    this.setDateView();

    this.activatedRouter.paramMap.subscribe((params) => {
      this.selectedDonorId = Number(params.get("id"))
        ? Number(params.get("id"))
        : panera.id;
      this.selectedDonorName = String(params.get("name"));
      if (this.selectedDonorName === 'null') {
        this.selectedDonorName = panera.name;
      }
        this.selectedDate = String(params.get("date"));
      // TODO fix any.
      this.dailyDonations = this.dailyDonationsService.getByDonorIdAndMonth(
        this.selectedDonorId,
        "any"
      );
      this.dailyDonations.subscribe((donations) => {
        this.events = this.fromDailyDonationsToEvents(donations);
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

    this.dailyDonations = this.dailyDonationsService.getByDonorIdAndMonth(
      this.selectedDonorId,
      "any"
    );
    this.dailyDonations.subscribe((donations) => {
      this.events = this.fromDailyDonationsToEvents(donations);
    });

    this.isCompleted();
    this.changeDetectorRefs.detectChanges();
  }

  fromDailyDonationToEvent(donation: DailyDonation): CalendarEvent {
    let calendarEvent = {
      start: addDays(new Date(donation.date), 1),
      end: addDays(new Date(donation.date), 1),
      title: donation.category + " - " + donation.quantity,
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

  fromDailyDonationsToEvents(donations: DailyDonation[]): CalendarEvent[] {
    return donations.map((donation) => this.fromDailyDonationToEvent(donation));
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
    dialogConfig.data = { category: "Bakery", quantity: 10 };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(
      AddDailyDonationComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result: DailyDonation) => {
      result.date = this.getViewDateStr();
      console.log("Dialog result:", result);
      this.addDonation(result);
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addDonation(donationToAdd: DailyDonation) {
    // Hardcode pantry Id as 1.
    this.dailyDonationsService.createDailyDonation(1, donationToAdd);
    this.refresh();
  }

  deleteDonation(donationToDelete: DailyDonation) {
    this.dailyDonationsService.deleteDailyDonation(
      this.selectedDonorId,
      donationToDelete.id
    );
    this.refresh();
  }

  updateDonation(donationToUpdate: DailyDonation) {
    console.log("update ", donationToUpdate);
    this.dailyDonationsService.updateDailyDonation(
      this.selectedDonorId,
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
    this.dailyDonationsService
      .getStatusByDonorIdAndDate(1, this.getViewDateStr())
      .subscribe((s) => {
        console.log("s", s);
        return (this.donationComplete = s === "Completed");
      });
    console.log("donationComplete", this.donationComplete);
    return this.donationComplete;
  }
}
