import {
  Component,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTermDto } from '@shared/dtos/create.term.dto';
import {
  TermServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-term-dialog.component.html'
})
export class CreateTermDialogComponent extends AppComponentBase {
  saving = false;
  term: CreateTermDto = new CreateTermDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _termService: TermServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  onlyIntegers(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  save(): void {
    this.saving = true;
    this._termService.create(this.term).subscribe(
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