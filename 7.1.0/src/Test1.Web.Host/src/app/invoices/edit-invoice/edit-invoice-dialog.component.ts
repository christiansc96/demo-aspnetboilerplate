import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { InvoiceDto } from '@shared/dtos/invoice.dto';
import {
  InvoiceServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-invoice-dialog.component.html',
})

export class EditInvoiceDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  invoice: InvoiceDto = new InvoiceDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _invoiceService: InvoiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._invoiceService.get(this.id).subscribe((result: InvoiceDto) => {
      this.invoice = result;
    });
  }

  save(): void {
    this.saving = true;
    this._invoiceService.update(this.invoice).subscribe(
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
