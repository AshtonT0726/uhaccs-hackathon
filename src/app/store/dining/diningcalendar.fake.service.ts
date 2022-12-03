import { DatePipe } from "@angular/common";
import { Host, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {  mealToColor } from "../../core/model/constants";
import { DiningDonation, HostDonation } from "../../core/model/dining-donation";
import {
  busch,
  livingston,
  collegeAvenue,
  cookDouglass
} from "../../core/model/dining-hall-constants";

@Injectable( {
  providedIn: 'root'
})
export class DiningDonationsFakeService {
  hostDonation : HostDonation = this.createHostDonation();

  currentId: number = 60001;

  datePipe = new DatePipe("en-US");

  constructor() {}

  createHostDonation(): HostDonation {
    let dd: HostDonation = { hostId: 1, diningDonations : this.createAllDiningDonation(10000)};
    return dd;
  }

  createAllDiningDonation(seedId: number): DiningDonation[] {
    let donations: DiningDonation[] = [];

    for (let i = 1; i <= 31; i++) {
      
    
      let r: number = this.getRandom(10);
      if (r >= 9) {
        donations.push(this.fakeDiningDonation(seedId, i, 1, "Busch", "Breakfast"));
      } else if (r >= 8) {
        donations.push(this.fakeDiningDonation(seedId, i, 2, "Livingston", "Dinner"));
      }
    }
    return donations;
  }

  getHostDiningDonations(): DiningDonation[] {
    return this.hostDonation.diningDonations;
  }

  getDiningDonation(id: number): Observable<DiningDonation[]> {
    let dd: DiningDonation[] = this.getHostDiningDonations();
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.id == id));
      }, 10);
    });
    return data;
  }

  getByDate(
    date: string
  ): Observable<DiningDonation[]> {
    console.log("getByDate", date);
    let dd: DiningDonation[] = this.getHostDiningDonations();
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.date == date));
      }, 10);
    });
    return data;
  }

  getByMonth(
    date: string
  ): Observable<DiningDonation[]> {
    console.log("getByMonth", date);
    let dd: DiningDonation[] = this.getHostDiningDonations();
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd);
      }, 10);
    });
    return data;
  }

  getStatusByDate(date: string): Observable<string> {
    console.log("getStatusByDate", date);
    let data = new Observable<string>((observer) => {
      setTimeout(() => {
        if (this.getCurrentDateStr() >= date) {
          return of("Completed");
        } else {
          return of("Scheduled");
        }
      }, 10);
    });
    return data;
  }

  createDiningDonation(
    diningDonation: DiningDonation
  ): Observable<DiningDonation> {
    diningDonation.id = this.currentId;
    diningDonation.color = mealToColor[diningDonation.meal];
    this.currentId += 1;
    this.getHostDiningDonations().push(diningDonation);
    console.log("fake service created ", diningDonation);
    return of(diningDonation);
  }

  deleteDiningDonation(id: number): Observable<any> {
    let dd: DiningDonation[] = this.getHostDiningDonations();
    dd.forEach((element, index) => {
      if (element.id === id) delete dd[index];
    });
    return of(id);
  }

  updateDiningDonation(
    diningDonation: DiningDonation
  ): Observable<DiningDonation> {
    let dd: DiningDonation[] = this.getHostDiningDonations();
    dd.forEach((element, index) => {
      if (element.id === diningDonation.id) delete dd[index];
    });

    dd.push(diningDonation);
    return of(diningDonation);
  }

  getRandom(max: number) {
    return Math.floor(Math.random() * max) + 1;
  }

  getDate(n: number) {
    if (n < 10) {
      return "2022-12-0" + n;
    } else {
      return "2022-12-" + n;
    }
  }

  fakeDiningDonation(
    seedId: number,
    i: number,
    j: number,
    location: string,
    meal: string
  ): DiningDonation {
    let donation: DiningDonation = {
      id: 10 * i + j + seedId,
      date: this.getDate(i),
      location: location,
      meal: meal,
      color: mealToColor[meal],
    };
    return donation;
  }

  getCurrentDateStr() {
    return this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
}
