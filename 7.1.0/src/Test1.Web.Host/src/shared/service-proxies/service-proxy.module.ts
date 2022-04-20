import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.InvoiceServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.TermServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
