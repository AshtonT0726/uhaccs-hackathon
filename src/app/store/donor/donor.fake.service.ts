import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Donor } from "../../core/model/donor";
import { emmas, freetown, hudsonGreene, panera, prato4th, pratoBay } from "../../core/model/donor-constants";

@Injectable( {
  providedIn: 'root'
})
export class DonorFakeService {
  donors: Donor[] = this.createDonors();

  currentId : number = 101;

  constructor() {}

  createDonors(): Donor[] {
    this.donors = [panera, pratoBay, prato4th, emmas, freetown, hudsonGreene];
    return this.donors;
  }

  getAllDonors(): Observable<Donor[]> {
    return of(this.donors);
  }

  createDonor( donorToAdd: Donor): Observable<Donor> {
    donorToAdd.id = this.currentId;
    donorToAdd.monthAvg = 0;
    this.currentId += 1;
    this.donors.push(donorToAdd);
    return of(donorToAdd);
  }
}
