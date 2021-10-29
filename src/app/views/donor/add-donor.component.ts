import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Donor } from "../../core/model/donor";

@Component({
  selector: "add-donor",
  templateUrl: "./add-donor.component.html",
  styleUrls: ["./add-donor.component.css"],
  providers: [MatDialogModule]
})
export class AddDonorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddDonorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Donor
  ) {
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
