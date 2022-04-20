import { IInvoiceDto } from './../interfaces/invoice.interface';
import { InvoiceDetailDto } from './../dtos/invoice.detail.dto';
import * as moment from 'moment';

export class InvoiceDto implements IInvoiceDto {
    id: number;
    invoiceNumber: string;
    invoiceDate: moment.Moment;
    customer: string;
    termDays: number;
    total: number;
    creationTime: moment.Moment;
    details: InvoiceDetailDto[]

    constructor(data?: IInvoiceDto) {
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
            this.invoiceNumber = _data["invoiceNumber"];
            this.invoiceDate = _data["invoiceDate"] ? moment(_data["invoiceDate"].toString()) : <any>undefined;
            this.customer = _data["customer"];
            this.termDays = _data["termDays"];
            this.total = _data["total"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
            this.details = _data["details"] ? _data["details"].map(function (val: any, index: number) {
                return InvoiceDetailDto.fromJS(val);
            }) : [];
        }
    }

    static fromJS(data: any): InvoiceDto {
        data = typeof data === 'object' ? data : {};
        let result = new InvoiceDto();
        result.init(data);
        return result;
    }
}