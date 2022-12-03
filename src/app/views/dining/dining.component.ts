import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DiningHall } from "../../core/model/dining-hall";
import { DiningFakeServices } from "../../store/dining/dining.fake.service";
import { AddDiningComponent } from "./add-dining.component";

@Component({
  templateUrl: "dining.component.html",
})
export class DiningComponent implements OnInit {

  asyncDiningHalls: Observable<DiningHall[]>;

  constructor(
    private router: Router,
    private diningService: DiningFakeServices,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.asyncDiningHalls = this.diningService.getAllDiningHalls( );
  }

  addDiningDialog() {
    console.log("addDiningDialog");

    const dialogRef = this.matDialog.open(AddDiningComponent, {
      data: {},
      width: "600px",
      height: "400px",
    });

    dialogRef.afterClosed().subscribe((result: DiningHall) => {
      this.addDiningHall(result);
    });
  }

  addDiningHall(diningHallToAdd: DiningHall) {
    this.diningService.createDiningHall( diningHallToAdd);
  }

  onDiningHall(clickedDiningHall: DiningHall) {
    console.log("onDiningHall", clickedDiningHall);
    this.router.navigate([
      "../dailydonations/calendar",
      {
        name: clickedDiningHall.name,
        id: clickedDiningHall.id,
      },
    ]);
  }
}
