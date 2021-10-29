import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Kitchen, KitchenGroup } from "../../core/model/kitchen";
import {
  boweryMission,
  hobokenShelter,
  houseOfFaith,
  jerseyCityGroup,
  lowerManhattanGroup,
  lunchtime,
  nycRescue,
  stLucys,
  theDoor,
} from "../../core/model/kitchen-constants";

@Injectable({
  providedIn: "root",
})
export class KitchenFakeService {
  groups: KitchenGroup[] = this.cerateGroups();
  kitchens: Kitchen[] = [];

  currentKitchenId: number = 101;

  constructor() {}

  cerateGroups(): KitchenGroup[] {
    jerseyCityGroup.kitchens = [
      stLucys,
      hobokenShelter,
      houseOfFaith,
      lunchtime,
    ];
    lowerManhattanGroup.kitchens = [nycRescue, boweryMission, theDoor];

    this.groups = [jerseyCityGroup, lowerManhattanGroup];
    return this.groups;
  }

  getAllGroups(): Observable<KitchenGroup[]> {
    return of(this.groups);
  }

  getKitchensByGroup(groupId: number): Observable<Kitchen[]> {
    console.log("getKitchensByGroup", groupId);
    this.groups.forEach((g) => {
      if (g.id === groupId) {
        console.log("getKitchensByGroup", g.kitchens);
        this.kitchens = g.kitchens;
      }
    });
    return of(this.kitchens);
  }

  getKitchenById(kitchenId: number): Kitchen {
    let kitchen: Kitchen;
    this.groups.forEach((g) => {
      g.kitchens.forEach((k) => {
        if (k.id === kitchenId) {
          kitchen = k;
        }
      });
    });

    return kitchen;
  }

  createKitchen(groupId: number, kitchenToAdd: Kitchen): Observable<Kitchen> {
    kitchenToAdd.id = this.currentKitchenId;
    kitchenToAdd.monthAvg = 0;

    this.currentKitchenId += 1;

    let group: KitchenGroup;
    this.groups.forEach((g) => {
      if (g.id === groupId) {
        group = g;
      }
    });

    group.kitchens.push(kitchenToAdd);
    console.log("fake service created ", kitchenToAdd);
    return of(kitchenToAdd);
  }

  findKitchensInSameGroup(fromKitchenId: number): number[] {
    let kids: number[] = [];
    let group: KitchenGroup;
    this.groups.forEach((g) => {
      g.kitchens.forEach((k) => {
        if (k.id === fromKitchenId) {
          group = g;
        }
      });
    });

    group.kitchens.forEach((k) => {
      kids.push(k.id);
    });

    return kids;
  }
}
