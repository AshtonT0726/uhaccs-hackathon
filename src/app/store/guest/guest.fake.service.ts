import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Guest } from "../../core/model/guest";
import {
  ashton,
  ayush,
  suveer,
  jacob,
  courtney,
  lamar,
  chester
} from "../../core/model/guest-constants";

@Injectable({
  providedIn: "root",
})
export class GuestFakeService {
  guests: Guest[] = this.createGuests();

  currentGuestId: number = 101;

  constructor() { }

  createGuests(): Guest[] {
    this.guests = [
      ashton,
      ayush,
      suveer,
      jacob,
      courtney,
      lamar,
      chester
    ];
    console.log("create", this.guests);
    return this.guests;
  }

  getGuests(): Observable<Guest[]> {
    console.log("get", this.guests);

    return of(this.guests);
  }


  getGuestById(guestId: number): Guest {
    let guest: Guest;
    this.guests.forEach((k) => {
      if (k.id === guestId) {
        guest = k;
      }
    });

    return guest;
  }

  createGuest(guestToAdd: Guest): Observable<Guest> {
    guestToAdd.id = this.currentGuestId;

    this.currentGuestId += 1;


    this.guests.push(guestToAdd);
    console.log("fake service created ", guestToAdd);
    return of(guestToAdd);
  }

}
