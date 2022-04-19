import * as moment from 'moment';

export interface IInvoiceDto {
    id: number;
    invoiceNumber: string;
    invoiceDate: moment.Moment;
    customer: string;
    termDays: number;
    total: number;
    creationTime: moment.Moment;
}