import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DailyDonation } from "../../core/model/daily-donation";

@Component({
  selector: "add-dailydonation",
  templateUrl: "./add-dailydonation.component.html",
  styleUrls: ["./add-dailydonation.component.css"],
  providers: [MatDialogModule],
})
export class AddDailyDonationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDailyDonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailyDonation
  ) {
    console.log("AddDailydonationComponent", data);
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
