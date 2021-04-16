using System;
using System.Collections.Generic;

#nullable disable

namespace XlabSales.Models
{
    public partial class InvoiceDetail
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int InvoiceId { get; set; }

        public virtual Invoice Invoice { get; set; }
    }
}
