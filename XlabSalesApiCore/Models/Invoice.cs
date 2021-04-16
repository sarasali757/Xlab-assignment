using System;
using System.Collections.Generic;

#nullable disable

namespace XlabSales.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceDetails = new HashSet<InvoiceDetail>();
        }

        public int Id { get; set; }
        public string ClientName { get; set; }
        public DateTime? Date { get; set; }

        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
