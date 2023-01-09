import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Guest } from "../../core/model/guest";
import { AddGuestComponent } from "./add-guest.component";
import { GuestFakeService } from "../../store/guest/guest.fake.service";

@Component({
  templateUrl: "guest.component.html",
})
export class GuestComponent implements OnInit {

  asyncGuests: Observable<Guest[]>;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private guestService: GuestFakeService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.themeColors();
    this.asyncGuests = this.guestService.getGuests();

    this.activatedRouter.paramMap.subscribe((params) => {
      this.asyncGuests = this.guestService.getGuests();
    });
  }

  addGuestDialog() {
    console.log("addGuestDialog");

    const dialogRef = this.matDialog.open(AddGuestComponent, {
      data: {},
      width: "600px",
      height: "600px",
    });

    dialogRef.afterClosed().subscribe((result: Guest) => {
      this.guestService.createGuest(result);
    });
  }

  addGuest(guestToAdd: Guest) {
   
  }
}
