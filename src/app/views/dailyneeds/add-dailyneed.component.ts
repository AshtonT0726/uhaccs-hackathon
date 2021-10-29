import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { DailyNeed } from "../../core/model/daily-need";

@Component({
  selector: "add-dailyneed",
  templateUrl: "./add-dailyneed.component.html",
  styleUrls: ["./add-dailyneed.component.css"],
  providers: [MatDialogModule]
})
export class AddDailyNeedComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDailyNeedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailyNeed
  ) {
    console.log("AddDailyNeedComponent", data);
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
