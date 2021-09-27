import { StudentResponse } from './../../../models/StudentResponse';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  delete: any

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public injected: any) { 
      this.delete = injected;
    }

  ngOnInit() {
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
