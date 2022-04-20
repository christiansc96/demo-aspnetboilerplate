import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateInvoiceDto } from '@shared/dtos/create.invoice.dto';
import { InvoiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { CreateInvoiceDetailDto } from '@shared/dtos/create.invoice.detail.dto';

@Component({
  templateUrl: './create-invoice-dialog.component.html',
})

export class CreateInvoiceDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  invoice: CreateInvoiceDto = new CreateInvoiceDto();
  public invoiceForm: FormGroup;

  @Output() onSave = new EventEmitter<any>();

  constructor(private _fb: FormBuilder,
    injector: Injector,
    public _invoiceService: InvoiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()])
    });
    this.invoice.total = 0;
    this.invoice.details = [];
  }

  initRows() {
    return this._fb.group({
      description: [""],
      qty: [""],
      price: [""],
      totalLine: [""]
    });
  }

  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  calculateTotal(index: number) {
    let getQuantity = this.formArr.controls[index].value.qty;
    if (getQuantity.replace(/\s/g, "") == "") {
      getQuantity = 0;
    }

    let getPrice = this.formArr.controls[index].value.price;
    if (getPrice.replace(/\s/g, "") == "") {
      getPrice = 0;
    }

    this.formArr.controls[index].value.totalLine = parseInt(getQuantity) * parseFloat(getPrice);
    let sum = 0;
    this.formArr.controls.forEach((product) => {
      sum += product.value.totalLine;
    });
    this.invoice.total = sum;
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
    let sum = 0;
    this.formArr.controls.forEach((product) => {
      sum += product.value.totalLine;
    });
    this.invoice.total = sum;
  }

  onlyDecimals(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyIntegers(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onlyNumbers(event: any) {
    const pattern = /[0-9\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  save(): void {
    this.saving = true;
    let details: CreateInvoiceDetailDto[] = [];
    this.formArr.controls.forEach((product) => {
      if (product.value.price != "" && product.value.qty != ""
        && product.value.description != "") {
        details.push(<CreateInvoiceDetailDto>
          {
            description: product.value.description,
            qty: parseInt(product.value.qty),
            price: parseFloat(product.value.price),
            totalLine: parseInt(product.value.qty) * parseFloat(product.value.price),
          });
      }
    });

    this.invoice.details = details;
    let validateDetails = this.invoice.details ? this.invoice.details.length > 0 : false;
    if (validateDetails) {
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
    } else {
      this.saving = false;
      this.notify.error("The invoice has no items.");
    }
  }
}
