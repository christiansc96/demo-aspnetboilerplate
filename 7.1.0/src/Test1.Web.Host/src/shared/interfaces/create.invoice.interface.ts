import * as moment from 'moment';

export interface ICreateInvoiceDto {
    invoiceNumber: string;
    invoiceDate: moment.Moment;
    customer: string;
    termDays: number;
    total: number;
}