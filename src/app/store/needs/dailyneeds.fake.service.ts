import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { categoryToColor } from "../../core/model/constants";
import { DailyNeed, KitchenNeeds } from "../../core/model/daily-need";
import {
  boweryMission,
  hobokenShelter,
  houseOfFaith,
  lunchtime,
  nycRescue,
  stLucys,
  theDoor
} from "../../core/model/kitchen-constants";
import { KitchenFakeService } from "../kitchen/kitchen.fake.service";
import { VolunteerFakeService } from "../volunteer/volunteer.fake.service";

@Injectable( {
  providedIn: 'root'
})
export class DailyNeedsFakeService {
  kitchenNeeds: KitchenNeeds[] = this.createdAllKitchenNeeds();

  currentId: number = 60001;

  constructor(
    private kitchenFakeService: KitchenFakeService,
    private volunteerService: VolunteerFakeService
  ) {}

  createdAllKitchenNeeds(): KitchenNeeds[] {
    let kn: KitchenNeeds[] = [];
    kn.push({
      kitchenId: stLucys.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: houseOfFaith.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: hobokenShelter.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: lunchtime.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: nycRescue.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: boweryMission.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });
    kn.push({
      kitchenId: theDoor.id,
      dailyNeeds: this.getAllDailyNeeds(10000),
    });

    return kn;
  }
  getAllDailyNeeds(seedId: number): DailyNeed[] {
    let needs: DailyNeed[] = [];

    for (let i = 1; i <= 31; i++) {
      needs.push(this.fakeDailyNeed(seedId, i, 1, "Bakery"));
      needs.push(this.fakeDailyNeed(seedId, i, 2, "Sandwich"));
      if ((i + 3) % 7 >= 2) {
        needs.push(this.fakeDailyNeed(seedId, i, 3, "Hot Meals"));
        needs.push(this.fakeDailyNeed(seedId, i, 4, "Soup"));
      }
      if ((i + 3) % 7 >= 5) {
        needs.push(this.fakeDailyNeed(seedId, i, 5, "Fruits"));
      }
    }
    return needs;
  }

  getKitchenDailyNeeds(kitchenId: number): DailyNeed[] {
    let dn: DailyNeed[];
    this.kitchenNeeds.forEach((kn) => {
      if (kn.kitchenId === kitchenId) {
        dn = kn.dailyNeeds;
      }
    });
    return dn;
  }

  getDailyNeed(kitchenId: number, id: number): Observable<DailyNeed[]> {
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);
    let data = new Observable<DailyNeed[]>((observer) => {
      setTimeout(() => {
        observer.next(dn.filter((i) => i.id == id));
      }, 10);
    });
    return data;
  }

  internalGetByKitchenIdAndDate(kitchenId: number, date: string): DailyNeed[] {
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);

    let data: DailyNeed[] = [];
    dn.forEach((n) => {
      if (n.date == date) {
        data.push(n);
      }
    });

    return data;
  }

  getByKitchenIdAndDate(
    kitchenId: number,
    date: string
  ): Observable<DailyNeed[]> {
    return of(this.internalGetByKitchenIdAndDate(kitchenId, date));
  }

  getByKitchenIdAndMonth(
    kitchenId: number,
    date: string
  ): Observable<DailyNeed[]> {
    console.log("getByKitchenIdAndMonth", kitchenId, date);
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);
    let data = new Observable<DailyNeed[]>((observer) => {
      setTimeout(() => {
        observer.next(dn);
      }, 10);
    });
    return data;
  }

  createDailyNeed(
    kitchenId: number,
    dailyNeed: DailyNeed
  ): Observable<DailyNeed> {
    dailyNeed.color = categoryToColor[dailyNeed.category];
    dailyNeed.id = this.currentId;
    this.currentId += 1;

    this.getKitchenDailyNeeds(kitchenId).push(dailyNeed);
    return of(dailyNeed);
  }

  deleteDailyNeed(kitchenId: number, id: number): Observable<any> {
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);
    let deleted: DailyNeed;
    dn.forEach((element, index) => {
      if (element.id === id) {
        deleted = dn[index];
        delete dn[index];
      }
    });

    this.checkReschedule(kitchenId, deleted.date);
    return of(id);
  }

  checkReschedule(kitchenId: number, date: string) {
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);
    let foodNeeded: boolean = false;
    dn.forEach((element, index) => {
      if (element.date === date) foodNeeded = true;
    });

    let newKitchenId: number;
    if (foodNeeded === false) {
      let kids: number[] =
        this.kitchenFakeService.findKitchensInSameGroup(kitchenId);
      for (let kid of kids) {
        let nextDns = this.internalGetByKitchenIdAndDate(kid, date);
        if (nextDns.length > 0) {
          newKitchenId = kid;
          break;
        }
      }
      console.log("newKitchenId", newKitchenId);
      this.volunteerService.noFoodNeeded(
        this.kitchenFakeService.getKitchenById(kitchenId),
        this.kitchenFakeService.getKitchenById(newKitchenId),
        date
      );
      }

  }

  updateDailyNeed(
    kitchenId: number,
    dailyNeed: DailyNeed
  ): Observable<DailyNeed> {
    let dn: DailyNeed[] = this.getKitchenDailyNeeds(kitchenId);
    dn.forEach((element, index) => {
      if (element.id === dailyNeed.id) delete dn[index];
    });

    dn.push(dailyNeed);
    return of(dailyNeed);
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

  fakeDailyNeed(
    seedId: number,
    i: number,
    j: number,
    category: string
  ): DailyNeed {
    let need: DailyNeed = {
      id: 10 * i + j + seedId,
      date: this.getDate(i),
      category: category,
      quantity: 20 * (((i + 3) % 7) + 3) * ((j % 2) + 1),
      color: categoryToColor[category],
    };
    return need;
  }
}
