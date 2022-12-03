import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { UntypedFormBuilder, Validators, FormGroup } from "@angular/forms";
import {  Guest } from "../../core/model/guest";

@Component({
  selector: "add-guest",
  templateUrl: "./add-guest.component.html",
  styleUrls: ["./add-guest.component.css"],
  providers: [MatDialogModule]
})
export class AddGuestComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddGuestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Guest
  ) {
    console.log("AddGuestComponent", data);
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
