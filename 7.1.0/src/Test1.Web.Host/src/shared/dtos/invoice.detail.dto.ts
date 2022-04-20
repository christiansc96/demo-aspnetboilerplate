import { IInvoiceDetailDto } from './../interfaces/invoice.detail.interface';
import * as moment from 'moment';

export class InvoiceDetailDto implements IInvoiceDetailDto {
    id: number;
    invoiceId: number;
    qty: number;
    price: number;
    totalLine: number;
    creationTime: moment.Moment;

    constructor(data?: IInvoiceDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.invoiceId = _data["invoiceId"];
            this.qty = _data["qty"];
            this.price = _data["price"];
            this.totalLine = _data["totalLine"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): InvoiceDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new InvoiceDetailDto();
        result.init(data);
        return result;
    }
}