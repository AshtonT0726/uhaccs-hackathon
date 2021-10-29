import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons/faInbox";
import { faStream } from "@fortawesome/free-solid-svg-icons/faStream";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { Observable, of, timer } from "rxjs";
import { NotificationMessage } from "../../core/model/notification";
import { NotificationFakeService } from "../../store/notification/notification.fake.service";
import { navItems } from "../../_nav";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
  providers: [NotificationFakeService],
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  newMessages: string = "";
  
  everySecond: Observable<number> = timer(0, 5000);

  notificationList: NotificationMessage[];

  containerScrollTop: number;

  datePipe = new DatePipe("en-US");

  readonly icons = { faSync, faInbox, faArrowRight, faTimes, faStream };

  constructor(private readonly notificationService: NotificationFakeService) {}

  ngOnInit(): void {
    this.reloadNotifications();
    this.everySecond.subscribe((seconds) => {
      this.reloadNotifications();
    });
  }

  dismissNotification(notification: NotificationMessage): void {
    this.notificationService
      .dismissNotification(notification)
      .subscribe((ns) => {
        this.notificationList = ns;
      });
  }

  reloadNotifications(): void {
    this.notificationService.getNotifications().subscribe((ns) => {
      this.notificationList = ns;
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  formatDate(d: Date) {
    return this.datePipe.transform(d, "MMM d, y");
  }

  numberOfMessages(): string {
    if (this.notificationList.length > 0) {
      return String(this.notificationList.length);
    } else {
      return "";
    }
  }
}
