import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { busch, livingston, collegeAvenue, cookDouglass, woodysBusch, kilmersMarket, cafeWest } from "../../core/model/dining-hall-constants";
import { DiningHall } from "../../core/model/dining-hall";

@Injectable({
  providedIn: 'root'
})
export class DiningFakeServices {
  diningHalls: DiningHall[] = this.createDiningHalls();

  currentId: number = 101;

  constructor() { }

  createDiningHalls(): DiningHall[] {
    this.diningHalls = [busch, livingston, collegeAvenue, cookDouglass, woodysBusch, kilmersMarket, cafeWest];
    console.log("create dining halls");
    return this.diningHalls;
  }

  getAllDiningHalls(): Observable<DiningHall[]> {
    return of(this.diningHalls);
  }

  createDiningHall(diningHallToAdd: DiningHall): Observable<DiningHall> {
    diningHallToAdd.id = this.currentId;
    this.currentId += 1;
    this.diningHalls.push(diningHallToAdd);
    return of(diningHallToAdd);
  }
}
