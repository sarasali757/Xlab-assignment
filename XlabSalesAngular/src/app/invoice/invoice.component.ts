import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup ,NgForm,ReactiveFormsModule, Validators} from '@angular/forms';
import {InvoiceService} from '../shared/invoice.service';
import {Invoice} from '../models/Invoice'
import {InvoiceDetails} from '../models/InvoiceDetails'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from '../notify-dialog/notify-dialog.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

  
  invoice : Invoice;
  //invoiceDetails :  Array <any> =[];
  //private fieldArray: Array<any> = [];
  
  newAttribute= new InvoiceDetails() ;
  
  searchForm = new FormGroup({
    searchInput : new FormControl("",Validators.min(1))
  })
  
  constructor(private service:InvoiceService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.invoice = new Invoice();
  }
  openConfirmDialog(message){
    return this.dialog.open(ConfirmDialogComponent,{data: message}).afterClosed();
  }
  openNotifyDialog(message){
    this.dialog.open(NotifyDialogComponent,{data : message})
  }
  searchInvoice(){
    let id = this.searchForm.controls['searchInput'].value;
    console.log(id)
    if(id){
      this.service.getInvoice(id).subscribe((data: Invoice) => {
        if(data){
        this.invoice = data ;
        this.invoice.date = this.invoice.date.toString().split('T')[0];
      }else{
        this.openNotifyDialog("Not Found")  
      }
      },err=> 
      {
        this.openNotifyDialog("Something went wrong!")
        this.clear();
      })
    }
    else{
      this.openNotifyDialog("Enter ID")
    }

  }

  clear(){
    this.searchForm.reset();
    this.invoice.invoiceDetails = [] ;
    this.invoice = new Invoice();
  }
  insert(form: NgForm){

    if(!form.invalid ){
    console.log(this.invoice)
    this.service.insertInvoice(this.invoice).subscribe(data=>{ 
      this.invoice = data as Invoice
      console.log(data)
      this.openNotifyDialog("Added Successfully")
      }, 
      err=> {this.openNotifyDialog("Something went wrong!")});
    }
    else{
      this.openNotifyDialog("Invalid operation")

    }
  }

  update(){
    console.log(this.invoice.invoiceDetails)
    this.service.updateInvoice(this.invoice).subscribe(
      data=>{ 
        this.openNotifyDialog("updated Successfully")
        console.log(data)},
      err=> { this.openNotifyDialog("Something went wrong!")});
  }

  delete(){
    console.log(this.invoice.id)
    if(this.invoice.id !=0){
      this.openConfirmDialog("Are you Sure ?") .subscribe(result=> {
        if (result){
          this.service.deleteInvoice(this.invoice.id).subscribe(response => {
            this.clear();
            },
          err => {console.log(err);}) ;
        }
      })
    
    }else{
      this.openNotifyDialog("No item to Delete")
    }
  }
  calculateTotal(price:number, quantity:number) : number{
    return price * quantity;
}
  getTotalPill() : number{
    let total = 0;
    if(this.invoice.invoiceDetails.length >0){
      this.invoice.invoiceDetails.forEach(element => {
        total += element.unitPrice * element.quantity;
      });
    }
    return total;
  }

  getTotalCountItems(){
    let total =0;
    if(this.invoice.invoiceDetails.length >0){
      this.invoice.invoiceDetails.forEach(element => {
        total += 1;
      });
    }
    return total;
  }
  addFieldValue() {    
    let attribute = new InvoiceDetails() ;
    attribute.item = this.newAttribute.item;
    attribute.quantity = this.newAttribute.quantity;
    attribute.unitPrice = this.newAttribute.unitPrice;
    attribute.invoiceId = this.newAttribute.invoiceId;

    this.invoice.invoiceDetails.push(attribute)

    console.log("Add",this.invoice)

    this.newAttribute = {
      id : null,
      item : null,
      unitPrice:null,
      quantity:null,
      invoiceId :this.invoice.id
    };

  }

  deleteFieldValue(index) {
      this.invoice.invoiceDetails.splice(index, 1);
  }

}
