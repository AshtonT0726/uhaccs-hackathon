import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { UntypedFormBuilder, Validators, FormGroup } from "@angular/forms";
import {  Kitchen } from "../../core/model/kitchen";

@Component({
  selector: "add-kitchen",
  templateUrl: "./add-kitchen.component.html",
  styleUrls: ["./add-kitchen.component.css"],
  providers: [MatDialogModule]
})
export class AddKitchenComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddKitchenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Kitchen
  ) {
    console.log("AddKitchenComponent", data);
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
