using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XlabSales.Models.Repository
{
    public class InvoiceDBRepository
    {

        SalesDbContext db;
        public InvoiceDBRepository(SalesDbContext db) {
            this.db = db;
        }

        public Invoice GetInvoice(int id)
        {
            Invoice invoice = db.Invoices.SingleOrDefault(i => i.Id == id);
            return invoice; 
        }

        public void InsertInvoice(Invoice invoice) {

            db.Invoices.Add(invoice);
            db.SaveChanges();
            
        }

        public void UpdateInvoice(Invoice invoice)
        {

            Invoice existingInvoice = GetInvoice(invoice.Id);

            if (existingInvoice != null)
            {

                existingInvoice.ClientName = invoice.ClientName;
                existingInvoice.Date = invoice.Date;
                var itemsToBeDeleted = existingInvoice.InvoiceDetails
                    .Where(i => !invoice.InvoiceDetails.Contains(i));
                db.InvoiceDetails.RemoveRange(itemsToBeDeleted);
                existingInvoice.InvoiceDetails = invoice.InvoiceDetails;
                db.SaveChanges();
            }
            else {
                throw new Exception();
            }
        }
        public void DeleteInvoice(Invoice invoice)
        {
            db.Invoices.Remove(invoice);
            db.SaveChanges();
        }


    }
}
