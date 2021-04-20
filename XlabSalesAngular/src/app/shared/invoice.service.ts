import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private port : number = 64072 

  constructor(private httpService: HttpClient) { }

  getInvoice(id:number){
    return this.httpService.get('http://localhost:'+this.port+'/api/Invoice/GetInvoice/'+id)
  }
  insertInvoice(invoice:Invoice){

    invoice.invoiceDetails.forEach(element => {
      element.id = 0;
      element.invoiceId=0;
    });
    console.log(JSON.stringify(invoice));

    return this.httpService.post('http://localhost:'+this.port+'/api/Invoice/InsertInvoice'
    , JSON.stringify(invoice), 
     {headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"})})
  }
  updateInvoice(invoice: Invoice){

    return  this.httpService.put('http://localhost:'+this.port+'/api/Invoice/UpdateInvoice', 
    JSON.stringify(invoice),
     {headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"})})
  }

  deleteInvoice(id:number){
    return this.httpService.delete('http://localhost:'+this.port+'/Api/Invoice/DeleteInvoice/'+id) 
  }
}
