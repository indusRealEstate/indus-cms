import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "caution-dialog",
  styleUrls: ["./caution-dialog.component.scss"],
  templateUrl: "./caution-dialog.component.html",
})
export class CautionDialog implements OnInit {
  type: any = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CautionDialog>,
    private dialog?: MatDialog
  ) {
    this.type = data.type;
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onCloseDialog() {
    this.dialogRef.close({
      delete: false,
    });
  }

  submit() {
    this.dialogRef.close({
      delete: true,
    });
  }
}