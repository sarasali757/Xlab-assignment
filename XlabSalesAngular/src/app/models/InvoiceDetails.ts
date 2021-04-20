export class InvoiceDetails{

    id:number;
    item: string;
    unitPrice: number;
    quantity: number;
    invoiceId: number;

    constructor(){
        this.id =0;
        this.item ='';
        this.unitPrice =0;
        this.quantity =0;
        this.invoiceId =0;
    }
}