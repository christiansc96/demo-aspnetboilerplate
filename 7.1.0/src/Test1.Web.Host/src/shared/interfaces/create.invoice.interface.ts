import * as moment from 'moment';
import { CreateInvoiceDetailDto } from './../dtos/create.invoice.detail.dto';

export interface ICreateInvoiceDto {
    invoiceNumber: string;
    invoiceDate: moment.Moment;
    customer: string;
    termDays: number;
    total: number;
    details: CreateInvoiceDetailDto[]
}