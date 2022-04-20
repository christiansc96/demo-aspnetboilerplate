import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { InvoiceDto } from '@shared/dtos/invoice.dto';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { InvoiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InvoiceDtoPagedResultDto } from '@shared/service-proxies/pages/invoice.page';
import { CreateInvoiceDialogComponent } from './create-invoice/create-invoice-dialog.component';
import { EditInvoiceDialogComponent } from './edit-invoice/edit-invoice-dialog.component';

class PagedInvoicesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './invoices.component.html',
  animations: [appModuleAnimation()]
})
export class InvoicesComponent extends PagedListingComponentBase<InvoiceDto> {
  invoices: InvoiceDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _invoiceService: InvoiceServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createInvoice(): void {
    this.showCreateOrEditInvoiceDialog();
  }

  editInvoice(term: InvoiceDto): void {
    this.showCreateOrEditInvoiceDialog(term.id);
  }

  showCreateOrEditInvoiceDialog(id?: number): void {
    let createOrEditInvoiceDialog: BsModalRef;
    if (!id) {
      createOrEditInvoiceDialog = this._modalService.show(
        CreateInvoiceDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditInvoiceDialog = this._modalService.show(
        EditInvoiceDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          },
        }
      );
    }

    createOrEditInvoiceDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(invoice: InvoiceDto): void {
    abp.message.confirm(
      this.l(`Invoice #${invoice.invoiceNumber} will be deleted.`, ''),
      undefined,
      (result: boolean) => {
        if (result) {
          this._invoiceService.delete(invoice.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedInvoicesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._invoiceService
      .getAll(
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: InvoiceDtoPagedResultDto) => {
        this.invoices = result.items;
        this.showPaging(result, pageNumber);
      });
  }
}
