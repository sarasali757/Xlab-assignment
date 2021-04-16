using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using XlabSales.Models;
using XlabSales.Models.Repository;

namespace XlabSales.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        SalesDbContext db;

        InvoiceDBRepository invoicRepo;
        InvoiceDetailDBRepository invoiceDetailRepo;
        public InvoiceController(InvoiceDBRepository invoice , InvoiceDetailDBRepository invoiceDetail) {
            invoicRepo = invoice;
            invoiceDetailRepo = invoiceDetail;
        }

        [HttpGet]
        public ActionResult GetAll() {
            return Ok(db.Invoices.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetInvoice(int id)
        {
            try
            {
                Invoice invoice = invoicRepo.GetInvoice(id);
                if (invoice != null)
                {
                    return Ok(invoice);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPost]
        public ActionResult InsertInvoice([FromBody] Invoice invoice) {
            try
            {

                Invoice checkIfExist =invoicRepo.GetInvoice(invoice.Id);

                //Invoice checkIfExist = db.Invoices.Find(invoice.Id);
    
                if (checkIfExist == null)
                {
                    if (invoice != null)
                    {
                        invoicRepo.InsertInvoice(invoice);
                        return Created("", invoice);
                    }
                    else
                    {
                        throw new Exception();
                    }
                }
                else {
                    throw new Exception();
                }
            }
            catch (Exception ex ) {
                return BadRequest();
            }
        }

        [HttpPut]
        public ActionResult UpdateInvoice(Invoice invoice) {
            
            try
            {
                invoicRepo.UpdateInvoice(invoice);
                return NoContent();
               
            }
            catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult DeleteInvoice(int id)
        {
            try
            {
                Invoice invoice = invoicRepo.GetInvoice(id);
                if (invoice != null)
                {
                    List<InvoiceDetail> invoiceDetails =
                        invoiceDetailRepo.GetInvoiceDetails(id);

                    foreach (var invoiceDetail in invoiceDetails)
                    {
                        invoiceDetailRepo.DeleteInvoiceDetails(invoiceDetail);
                    }
                    invoicRepo.DeleteInvoice(invoice);
                    return Ok();
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception) {
                return BadRequest();
            }
        }

    }
    
}