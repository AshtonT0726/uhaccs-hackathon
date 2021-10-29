import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { categoryToColor } from "../../core/model/constants";
import { DailyDonation, DonorDonation } from "../../core/model/daily-donation";
import {
  emmas,
  freetown,
  hudsonGreene,
  panera,
  prato4th,
  pratoBay,
} from "../../core/model/donor-constants";

@Injectable( {
  providedIn: 'root'
})
export class DailyDonationsFakeService {
  donorDonations: DonorDonation[] = this.createDonorDonations();

  currentId: number = 60001;

  datePipe = new DatePipe("en-US");

  constructor() {}

  createDonorDonations(): DonorDonation[] {
    let dd: DonorDonation[] = [];
    dd.push({
      donorId: panera.id,
      dailyDonations: this.createAllDailyDonations(10000, true),
    });

    dd.push({
      donorId: prato4th.id,
      dailyDonations: this.createAllDailyDonations(20000, true),
    });

    dd.push({
      donorId: pratoBay.id,
      dailyDonations: this.createAllDailyDonations(30000, true),
    });

    dd.push({
      donorId: emmas.id,
      dailyDonations: this.createAllDailyDonations(40000, false),
    });

    dd.push({
      donorId: hudsonGreene.id,
      dailyDonations: this.createAllDailyDonations(50000, false),
    });
    dd.push({
      donorId: freetown.id,
      dailyDonations: this.createAllDailyDonations(60000, false),
    });
    return dd;
  }

  createAllDailyDonations(seedId: number,  bakeryOnly: boolean): DailyDonation[] {
    let donations: DailyDonation[] = [];

    for (let i = 1; i <= 31; i++) {
      
    
      let r: number = this.getRandom(3);
      if (r > 1 || bakeryOnly) {
        donations.push(this.fakeDailyDonation(seedId, i, 1, "Bakery"));
        donations.push(this.fakeDailyDonation(seedId, i, 4, "Sandwich"));
      } else if (r <=2 && !bakeryOnly) {
        donations.push(this.fakeDailyDonation(seedId, i, 2, "Hot Meals"));
        donations.push(this.fakeDailyDonation(seedId, i, 3, "Soup"));
      }
      if (this.getRandom(3) > 1 && !bakeryOnly) {
        donations.push(this.fakeDailyDonation(seedId, i, 5, "Fruits"));
      }
    }
    return donations;
  }

  getDonorDailyDonations(donorId: number): DailyDonation[] {
    let dd: DailyDonation[];
    this.donorDonations.forEach((kd) => {
      if (kd.donorId === donorId) {
        dd = kd.dailyDonations;
      }
    });
    return dd;
  }

  getDailyDonation(donorId: number, id: number): Observable<DailyDonation[]> {
    let dd: DailyDonation[] = this.getDonorDailyDonations(donorId);
    let data = new Observable<DailyDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.id == id));
      }, 10);
    });
    return data;
  }

  getByDonorIdAndDate(
    donorId: number,
    date: string
  ): Observable<DailyDonation[]> {
    console.log("getByDonorIdAndDate", donorId, date);
    let dd: DailyDonation[] = this.getDonorDailyDonations(donorId);
    let data = new Observable<DailyDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd.filter((i) => i.date == date));
      }, 10);
    });
    return data;
  }

  getByDonorIdAndMonth(
    donorId: number,
    date: string
  ): Observable<DailyDonation[]> {
    console.log("getByDonorIdAndMonth", donorId, date);
    let dd: DailyDonation[] = this.getDonorDailyDonations(donorId);
    let data = new Observable<DailyDonation[]>((observer) => {
      setTimeout(() => {
        observer.next(dd);
      }, 10);
    });
    return data;
  }

  getStatusByDonorIdAndDate(donorId: number, date: string): Observable<string> {
    console.log("getStatusByDonorIdAndDate", donorId, date);
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

  createDailyDonation(
    donorId: number,
    DailyDonation: DailyDonation
  ): Observable<DailyDonation> {
    DailyDonation.color = categoryToColor[DailyDonation.category];
    DailyDonation.id = this.currentId;
    this.currentId += 1;
    this.getDonorDailyDonations(donorId).push(DailyDonation);
    console.log("fake service created ", DailyDonation);
    return of(DailyDonation);
  }

  deleteDailyDonation(donorId: number, id: number): Observable<any> {
    let dd: DailyDonation[] = this.getDonorDailyDonations(donorId);
    dd.forEach((element, index) => {
      if (element.id === id) delete dd[index];
    });
    return of(id);
  }

  updateDailyDonation(
    donorId: number,
    dailyDonation: DailyDonation
  ): Observable<DailyDonation> {
    let dd: DailyDonation[] = this.getDonorDailyDonations(donorId);
    dd.forEach((element, index) => {
      if (element.id === dailyDonation.id) delete dd[index];
    });

    dd.push(dailyDonation);
    return of(dailyDonation);
  }

  getRandom(max: number) {
    return Math.floor(Math.random() * max) + 1;
  }

  getDate(n: number) {
    if (n < 10) {
      return "2021-10-0" + n;
    } else {
      return "2021-10-" + n;
    }
  }

  fakeDailyDonation(
    seedId: number,
    i: number,
    j: number,
    category: string
  ): DailyDonation {
    let donation: DailyDonation = {
      id: 10 * i + j + seedId,
      date: this.getDate(i),
      category: category,
      quantity: 10 * this.getRandom(8),
      color: categoryToColor[category],
    };
    return donation;
  }

  getCurrentDateStr() {
    return this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
}
