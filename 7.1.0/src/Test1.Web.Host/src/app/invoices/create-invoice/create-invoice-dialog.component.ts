import {
  Component,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateInvoiceDto } from '@shared/dtos/create.invoice.dto';
import { InvoiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './create-invoice-dialog.component.html',
})

export class CreateInvoiceDialogComponent extends AppComponentBase {
  saving = false;
  invoice: CreateInvoiceDto = new CreateInvoiceDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _invoiceService: InvoiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;

    this._invoiceService.create(this.invoice).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
