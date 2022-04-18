import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { TermServiceProxy, TermDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { TermDto } from './../../shared/dtos/term.dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
      // createOrEditTenantDialog = this._modalService.show(
      //   CreateTenantDialogComponent,
      //   {
      //     class: 'modal-lg',
      //   }
      // );
    } else {
      // createOrEditTenantDialog = this._modalService.show(
      //   EditTenantDialogComponent,
      //   {
      //     class: 'modal-lg',
      //     initialState: {
      //       id: id,
      //     },
      //   }
      // );
    }

    createOrEditTermDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(term: TermDto): void {
    // abp.message.confirm(
    //   this.l('UserDeleteWarningMessage', user.fullName),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this._userService.delete(user.id).subscribe(() => {
    //         abp.notify.success(this.l('SuccessfullyDeleted'));
    //         this.refresh();
    //       });
    //     }
    //   }
    // );
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