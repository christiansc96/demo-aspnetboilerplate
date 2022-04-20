import * as moment from 'moment';

export interface IInvoiceDetailDto {
    id: number;
    invoiceId: number;
    description: string;
    qty: number;
    price: number;
    totalLine: number;
    creationTime: moment.Moment;
}