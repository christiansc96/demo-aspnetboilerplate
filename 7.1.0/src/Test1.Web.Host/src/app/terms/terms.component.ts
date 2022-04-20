import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { TermServiceProxy } from '@shared/service-proxies/service-proxies';
import { TermDtoPagedResultDto } from '@shared/service-proxies/pages/term.page';
import { TermDto } from '@shared/dtos/term.dto';
import { CreateTermDialogComponent } from './create-term/create-term-dialog.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditTermDialogComponent } from './edit-term/edit-term-dialog.component';

class PagedTermsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './terms.component.html',
  animations: [appModuleAnimation()]
})
export class TermsComponent extends PagedListingComponentBase<TermDto> {
  terms: TermDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _termService: TermServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createTerm(): void {
    this.showCreateOrEditTermDialog();
  }

  editTerm(term: TermDto): void {
    this.showCreateOrEditTermDialog(term.id);
  }

  showCreateOrEditTermDialog(id?: number): void {
    let createOrEditTermDialog: BsModalRef;
    if (!id) {
      createOrEditTermDialog = this._modalService.show(
        CreateTermDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditTermDialog = this._modalService.show(
        EditTermDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id
          },
        }
      );
    }

    createOrEditTermDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(term: TermDto): void {
    abp.message.confirm(
      this.l(`Term ${term.name} will be deleted.`, ''),
      undefined,
      (result: boolean) => {
        if (result) {
          this._termService.delete(term.id).subscribe(() => {
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
    request: PagedTermsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._termService
      .getAll(
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TermDtoPagedResultDto) => {
        this.terms = result.items;
        this.showPaging(result, pageNumber);
      });
  }
}