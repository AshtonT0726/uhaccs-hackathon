import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Donor } from "../../core/model/donor";
import { Kitchen } from "../../core/model/kitchen";
import { Volunteer } from "../../core/model/volunteer";
import { me } from "../../core/model/volunteer-constants";
import { NotificationFakeService } from "../notification/notification.fake.service";

@Injectable( {
    providedIn: 'root'
  })  
export class VolunteerFakeService {
  constructor(private notificationService: NotificationFakeService) {}

  getVolunteer(id: number): Observable<Volunteer> {
    return of(me);
  }

  noFoodNeeded(oldKitchen: Kitchen, newKitchen: Kitchen, date: string) {
    for (let e of me.upcomingEvents) {
      if (e.date == date) {
        if (e.kitchen.id === oldKitchen.id) {
          console.log("update event", e.kitchen, newKitchen);
          this.sendEvent(e.donor, e.kitchen, newKitchen, date);
          e.kitchen = newKitchen;
        }
      }
    }
  }

  sendEvent(
    donor: Donor,
    oldKitchen: Kitchen,
    newKitchen: Kitchen,
    date: string
  ) {
      console.log("sendEvent", donor.name )
    this.notificationService.createNotification(
      me.id,
      donor.name,
      oldKitchen.name,
      newKitchen.name,
      date
    );
  }
}
