import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
//terms
import { TermsComponent } from './terms/terms.component';
import { CreateTermDialogComponent } from './terms/create-term/create-term-dialog.component';
import { EditTermDialogComponent } from './terms/edit-term/edit-term-dialog.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateInvoiceDialogComponent } from './invoices/create-invoice/create-invoice-dialog.component';
import { EditInvoiceDialogComponent } from './invoices/edit-invoice/edit-invoice-dialog.component';

@NgModule({
  declarations: [
    // general
    AboutComponent,
    AppComponent,
    HomeComponent,
    // invoices
    CreateInvoiceDialogComponent,
    EditInvoiceDialogComponent,
    InvoicesComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    RolesComponent,
    // users
    ChangePasswordComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    UsersComponent,
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    TenantsComponent,
    // terms
    CreateTermDialogComponent,
    EditTermDialogComponent,
    TermsComponent,
    // layout
    FooterComponent,
    HeaderComponent,
    HeaderLanguageMenuComponent,
    HeaderLeftNavbarComponent,
    HeaderUserMenuComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarMenuComponent,
    SidebarUserPanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [],
  entryComponents: [
    // invoices
    CreateInvoiceDialogComponent,
    EditInvoiceDialogComponent,
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // terms
    CreateTermDialogComponent,
    EditTermDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule { }
