import { InvoiceDetails } from "./InvoiceDetails";

export class Invoice{
    id: number;
    clientName : string;
    date: string;
    invoiceDetails : InvoiceDetails[];

    constructor(){
        this.id = 0;
        this.clientName = '';
        this.date = '';
        this.invoiceDetails =[];
    }
}