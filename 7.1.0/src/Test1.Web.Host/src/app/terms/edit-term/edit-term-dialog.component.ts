import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { TermDto } from '@shared/dtos/term.dto';
import {
  TermServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-term-dialog.component.html'
})
export class EditTermDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  term: TermDto = new TermDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _termService: TermServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._termService.get(this.id).subscribe((result: TermDto) => {
      this.term = result;
    });
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

    this._termService.update(this.term).subscribe(
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