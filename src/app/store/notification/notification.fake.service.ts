import { Injectable } from "@angular/core";
import { addDays } from "date-fns";
import { Observable, of } from "rxjs";
import { kitchenChangeMessage } from "../../core/model/constants";
import { NotificationMessage } from "../../core/model/notification";

export const notifications: NotificationMessage[] = [
  {
    id: 501,
    title: "Delivery Alert: Food Kitchen Change!",
    donor: "Panera",
    kitchen1: "St. Lucy's",
    kitchen2: "House Of Faith",
    received: new Date("2021-10-13"),
    dismissed: false,
  },
  {
    id: 502,
    title: "Delivery Alert: Food Kitchen Change!",
    donor: "Prato Bay",
    kitchen1: "Hoboken Shelter",
    kitchen2: "House Of Faith",
    received: new Date("2021-10-20"),
    dismissed: true,
  },
  {
    id: 503,
    title: "Delivery Alert: Food Kitchen Change!",
    donor: "Emma's",
    kitchen1: "House Of Failth",
    kitchen2: "St. Lucy's",
    received: new Date(),
    dismissed: false,
  },
];

@Injectable({
  providedIn: "root",
})
export class NotificationFakeService {
  currentId: number = 551;

  constructor() {}

  create(
    notificationId: number,
    d: string,
    k1: string,
    k2: string,
    rec: Date,
    dis: boolean
  ): NotificationMessage {
    return {
      id: notificationId,
      title: "Delivery Alert: Food Kitchen Change!",
      donor: d,
      kitchen1: k1,
      kitchen2: k2,
      received: rec,
      dismissed: dis,
    } as NotificationMessage;
  }
  createMessage(donor: string, kitchen1: string, kitchen2: string): string {
    return kitchenChangeMessage
      .replace("$donor", donor)
      .replace("$kitchen1", kitchen1)
      .replace("$kitchen2", kitchen2);
  }

  createNotification(
    volunteerId: number,
    donor: string,
    kitchen1: string,
    kitchen2: string,
    eventDate: string
  ): Observable<NotificationMessage> {
    let n: NotificationMessage = this.create(
      this.currentId,
      donor,
      kitchen1,
      kitchen2,
      addDays(new Date(eventDate), 1),
      false
    );

    notifications.push(n);
    console.log("this.notifications size", notifications.length);
    this.currentId += 1;
    return of(n);
  }

  getNotifications(): Observable<NotificationMessage[]> {
    console.log("getNotifications size", notifications.length);
    return of(
      notifications
        .filter((notification) => notification.dismissed === false)
        .sort(
          (a, b) => b.received.getMilliseconds() - a.received.getMilliseconds()
        )
    );
  }

  dismissNotification(
    notification: NotificationMessage
  ): Observable<NotificationMessage[]> {
    notifications.forEach((n) => {
      if (n.id === notification.id) {
        n.dismissed = true;
      }
    });
    return this.getNotifications();
  }
}
