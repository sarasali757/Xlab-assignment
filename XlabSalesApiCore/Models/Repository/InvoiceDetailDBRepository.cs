using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XlabSales.Models.Repository
{
    public class InvoiceDetailDBRepository
    {
        SalesDbContext db;
        public InvoiceDetailDBRepository(SalesDbContext db)
        {
            this.db = db;
        }

        public List<InvoiceDetail> GetInvoiceDetails(int id) { // get invoice detials by invoice id

            return db.InvoiceDetails.Where(x => x.InvoiceId == id).ToList();
        }

        public void InsertInvoiceDetail(InvoiceDetail invoiceDetail) {

            db.InvoiceDetails.Add(invoiceDetail);
            db.SaveChanges();

            
        }

        public void DeleteInvoiceDetails(InvoiceDetail invoiceDetail) {
            db.InvoiceDetails.Remove(invoiceDetail);
            db.SaveChanges();
        }
    }
}
