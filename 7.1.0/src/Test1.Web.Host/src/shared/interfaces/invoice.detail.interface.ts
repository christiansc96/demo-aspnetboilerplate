import * as moment from 'moment';

export interface IInvoiceDetailDto {
    id: number;
    invoiceId: number;
    qty: number;
    price: number;
    totalLine: number;
    creationTime: moment.Moment;
}