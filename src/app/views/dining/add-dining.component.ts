import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DiningHall } from "../../core/model/dining-hall";

@Component({
  selector: "add-dining",
  templateUrl: "./add-dining.component.html",
  styleUrls: ["./add-dining.component.css"],
  providers: [MatDialogModule]
})
export class AddDiningComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddDiningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiningHall
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
