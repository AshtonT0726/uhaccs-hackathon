import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Donor } from "../../core/model/donor";
import { DonorFakeService } from "../../store/donor/donor.fake.service";
import { AddDonorComponent } from "./add-donor.component";

@Component({
  templateUrl: "donor.component.html",
})
export class DonorComponent implements OnInit {

  asyncDonors: Observable<Donor[]>;

  constructor(
    private router: Router,
    private donorService: DonorFakeService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.asyncDonors = this.donorService.getAllDonors( );
  }

  addDonorDialog() {
    console.log("addNeedDialog");

    const dialogRef = this.matDialog.open(AddDonorComponent, {
      data: {},
      width: "600px",
      height: "400px",
    });

    dialogRef.afterClosed().subscribe((result: Donor) => {
      this.addDonor(result);
    });
  }

  addDonor(donorToAdd: Donor) {
    this.donorService.createDonor( donorToAdd);
  }

  onDonor(clickedDonor: Donor) {
    console.log("onDonor", clickedDonor);
    this.router.navigate([
      "../dailydonations/calendar",
      {
        name: clickedDonor.name,
        id: clickedDonor.id,
      },
    ]);
  }
}
