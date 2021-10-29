import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from "angular-calendar";
import {
  addDays,
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay
} from "date-fns";
import { Observable } from "rxjs";
import { colors } from "../../core/model/constants";
import { DailyNeed } from "../../core/model/daily-need";
import { stLucys } from "../../core/model/kitchen-constants";
import { DailyNeedsFakeService } from "../../store/needs/dailyneeds.fake.service";
import { AddDailyNeedComponent } from "./add-dailyneed.component";

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["dailyneeds.styles.css"],
  templateUrl: "dailyneeds.component.html",
})
export class DailyNeedsComponent implements OnInit {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  datePipe = new DatePipe("en-US");

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[];

  activeDayIsOpen: boolean = true;

  dailyNeeds: Observable<DailyNeed[]>;

  selectedKitchenName: string = stLucys.name;
  selectedKitchenId: number = stLucys.id;
  selectedDate: string | undefined;

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

  constructor(
    private modal: NgbModal,
    private dailyNeedsService: DailyNeedsFakeService,
    private changeDetectorRefs: ChangeDetectorRef,
    private matDialog: MatDialog,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.dailyNeeds = this.dailyNeedsService.getByKitchenIdAndMonth(
      this.selectedKitchenId,
      "any"
    );
    this.dailyNeeds.subscribe((needs) => {
      this.events = this.fromDailyNeedsToEvents(needs);
    });
    this.setDateView();

    this.activatedRouter.paramMap.subscribe((params) => {
      this.selectedKitchenId = Number(params.get("id"))
        ? Number(params.get("id"))
        : stLucys.id;
      this.selectedKitchenName = String(params.get("name"));
      if (this.selectedKitchenName === "null") {
        this.selectedKitchenName = stLucys.name;
      }
      this.selectedDate = String(params.get("date"));
      // TODO fix any.
      this.dailyNeeds = this.dailyNeedsService.getByKitchenIdAndMonth(
        this.selectedKitchenId,
        "any"
      );
      this.dailyNeeds.subscribe((needs) => {
        this.events = this.fromDailyNeedsToEvents(needs);
      });
      this.setDateView();
    });
    this.changeDetectorRefs.detectChanges();
    this.activeDayIsOpen = false;
  }

  setDateView() {
    if (this.selectedDate && this.selectedDate !== "null") {
      console.log("this.selectedDate", this.selectedDate);
      console.log("this.selectedDate", this.selectedDate.length);
      this.view = CalendarView.Day;
      this.viewDate = addDays(new Date(this.selectedDate), 1);
    }
  }

  refresh() {
    console.log("refresh");

    this.dailyNeeds = this.dailyNeedsService.getByKitchenIdAndMonth(
      this.selectedKitchenId,
      "any"
    );
    this.dailyNeeds.subscribe((needs) => {
      this.events = this.fromDailyNeedsToEvents(needs);
    });
    this.changeDetectorRefs.detectChanges();
  }

  fromDailyNeedToEvent(need: DailyNeed): CalendarEvent {
    let calendarEvent = {
      start: addDays(new Date(need.date), 1),
      end: addDays(new Date(need.date), 1),
      title: need.category + " - " + need.quantity,
      color: need.color,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: need.date,
    } as CalendarEvent;
    return calendarEvent;
  }

  fromDailyNeedsToEvents(needs: DailyNeed[]): CalendarEvent[] {
    return needs.map((need) => this.fromDailyNeedToEvent(need));
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

  addNeedDialog() {
    console.log("addNeedDialog");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { category: "Bakery", quantity: 10 };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(AddDailyNeedComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: DailyNeed) => {
      result.date = this.getViewDateStr();
      console.log("Dialog result:", result);
      this.addNeed(result);
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  addNeed(needToAdd: DailyNeed) {
    // Hardcode pantry Id as 1.
    this.dailyNeedsService.createDailyNeed(1, needToAdd);
    this.refresh();
  }

  deleteNeed(needToDelete: DailyNeed) {
    console.log("Delete ", needToDelete);
    this.dailyNeedsService.deleteDailyNeed(
      this.selectedKitchenId,
      needToDelete.id
    );
    this.refresh();
  }

  updateNeed(needToUpdate: DailyNeed) {
    console.log("update ", needToUpdate);
    this.dailyNeedsService.updateDailyNeed(
      this.selectedKitchenId,
      needToUpdate
    );
    this.refresh();
  }

  setView(view: CalendarView) {
    this.view = view;
    this.refresh();
  }

  closeOpenMonthViewDay() {
    console.log("closeOpenMonthViewDay", this.view, this.viewDate);
    this.activeDayIsOpen = false;
  }

  getViewDateStr() {
    console.log("getViewDateStr", this.viewDate);
    return this.datePipe.transform(this.viewDate, "yyyy-MM-dd");
  }
}
