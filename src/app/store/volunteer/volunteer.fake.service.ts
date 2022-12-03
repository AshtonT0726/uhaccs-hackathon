import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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
}
