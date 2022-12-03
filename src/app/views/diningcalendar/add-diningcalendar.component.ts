import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DiningDonation } from "../../core/model/dining-donation";

@Component({
  selector: "add-diningcalendar",
  templateUrl: "./add-diningcalendar.component.html",
  styleUrls: ["./add-diningcalendar.component.css"],
  providers: [MatDialogModule],
})
export class AddDiningCalendarComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddDiningCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiningDonation
  ) {
    console.log("AddDiningCalendarComponent", data);
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
