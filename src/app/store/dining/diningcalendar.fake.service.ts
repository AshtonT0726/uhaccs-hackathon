import { DatePipe } from "@angular/common";
import { Host, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { categoryToColor, mealToColor } from "../../core/model/constants";
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
  hostDonation: HostDonation[] = this.createHostDonation();

  currentId: number = 60001;

  datePipe = new DatePipe("en-US");

  constructor() {}

  createHostDonation(): HostDonation[] {
    let dd: HostDonation[] = [];
    dd.push({
      hostId: 1,
      diningDonations: this.createAllDiningDonation(10000, true),
    });
    return dd;
  }

  createAllDiningDonation(seedId: number,  bakeryOnly: boolean): DiningDonation[] {
    let donations: DiningDonation[] = [];

    for (let i = 1; i <= 31; i++) {
      
    
      let r: number = this.getRandom(3);
      if (r > 1 || bakeryOnly) {
        donations.push(this.fakeDiningDonation(seedId, i, 1, "Busch", "Breakfast"));
        donations.push(this.fakeDiningDonation(seedId, i, 4, "Livingston", "Lunch"));
      } else if (r <=2 && !bakeryOnly) {
        donations.push(this.fakeDiningDonation(seedId, i, 2, "Livingston", "Dinner"));
        donations.push(this.fakeDiningDonation(seedId, i, 3, "College Ave", "Lunch"));
      }
      if (this.getRandom(3) > 1 && !bakeryOnly) {
        donations.push(this.fakeDiningDonation(seedId, i, 5, "College Ave", "Breakfast"));
      }
    }
    return donations;
  }

  getHostDiningDonations(hostId: number): DiningDonation[] {
    let dd: DiningDonation[];
    this.hostDonation.forEach((kd) => {
      if (kd.hostId === hostId) {
        dd = kd.diningDonations;
      }
    });
    return dd;
  }

  getDiningDonation(hostId: number, id: number): Observable<DiningDonation[]> {
    let dd: DiningDonation[] = this.getHostDiningDonations(hostId);
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.id == id));
      }, 10);
    });
    return data;
  }

  getByHostIdAndDate(
    hostId: number,
    date: string
  ): Observable<DiningDonation[]> {
    console.log("getByDonorIdAndDate", hostId, date);
    let dd: DiningDonation[] = this.getHostDiningDonations(hostId);
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.date == date));
      }, 10);
    });
    return data;
  }

  getByHostIdAndMonth(
    hostId: number,
    date: string
  ): Observable<DiningDonation[]> {
    console.log("getByDonorIdAndMonth", hostId, date);
    let dd: DiningDonation[] = this.getHostDiningDonations(hostId);
    let data = new Observable<DiningDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd);
      }, 10);
    });
    return data;
  }

  getStatusByHostIdAndDate(hostId: number, date: string): Observable<string> {
    console.log("getStatusByHostIdAndDate", hostId, date);
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
    hostId: number,
    diningDonation: DiningDonation
  ): Observable<DiningDonation> {
    diningDonation.id = this.currentId;
    diningDonation.color = mealToColor[diningDonation.meal];
    this.currentId += 1;
    this.getHostDiningDonations(hostId).push(diningDonation);
    console.log("fake service created ", diningDonation);
    return of(diningDonation);
  }

  deleteDiningDonation(hostId: number, id: number): Observable<any> {
    let dd: DiningDonation[] = this.getHostDiningDonations(hostId);
    dd.forEach((element, index) => {
      if (element.id === id) delete dd[index];
    });
    return of(id);
  }

  updateDiningDonation(
    donorId: number,
    diningDonation: DiningDonation
  ): Observable<DiningDonation> {
    let dd: DiningDonation[] = this.getHostDiningDonations(donorId);
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
