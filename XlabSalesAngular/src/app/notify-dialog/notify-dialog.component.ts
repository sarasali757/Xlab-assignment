import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent implements OnInit {

 
  message;

  constructor(@Inject(MAT_DIALOG_DATA) data:any) {
    this.message = data;
   }
   
  ngOnInit(): void {
  }
}
