import { Injectable, signal } from '@angular/core';
import { InvoiceList } from 'src/app/pages/apps/invoice/invoice';
import { invoceLists } from 'src/app/pages/apps/invoice/invoiceData';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceList = signal<InvoiceList[]>(invoceLists);
  constructor() {}

  public getInvoiceList(): InvoiceList[] {
    return this.invoiceList();
  }

  deleteInvoice(id: number): void {
    this.invoiceList.update((invoices) =>
      invoices.filter((invoice) => invoice.id !== id)
    );
  }

  public addInvoice(invoice: InvoiceList): void {
    this.invoiceList.update((invoices) => [...invoices, invoice]);
  }

  public updateInvoice(id: number, invoice: InvoiceList): void {
    this.invoiceList.update((invoices) => {
      const index = invoices.findIndex((x) => x.id === id);
      if (index !== -1) {
        const updatedInvoices = [...invoices];
        updatedInvoices[index] = invoice; // Update the invoice at the found index
        return updatedInvoices;
      }
      return invoices; // Return the original list if not found
    });
  }
}
