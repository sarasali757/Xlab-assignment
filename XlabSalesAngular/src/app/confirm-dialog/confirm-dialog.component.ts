import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  message;
  constructor(@Inject(MAT_DIALOG_DATA) data:any) {
    this.message = data;
    console.log(data);
   }

  ngOnInit(): void {
  }

}
