import { ICreateInvoiceDto } from './../interfaces/create.invoice.interface';
import * as moment from 'moment';

export class CreateInvoiceDto implements ICreateInvoiceDto {
    invoiceNumber: string;
    invoiceDate: moment.Moment;
    customer: string;
    termDays: number;
    total: number;

    constructor(data?: ICreateInvoiceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.invoiceNumber = _data["invoiceNumber"];
            this.invoiceDate = _data["invoiceDate"];
            this.customer = _data["customer"];
            this.termDays = _data["termDays"];
            this.total = _data["total"];
        }
    }

    static fromJS(data: any): CreateInvoiceDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateInvoiceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["invoiceNumber"] = this.invoiceNumber;
        data["invoiceDate"] = this.invoiceDate;
        data["customer"] = this.customer;
        data["termDays"] = this.termDays;
        data["total"] = this.total;
        return data;
    }

    clone(): CreateInvoiceDto {
        const json = this.toJSON();
        let result = new CreateInvoiceDto();
        result.init(json);
        return result;
    }
}