import { ICreateInvoiceDetailDto } from './../interfaces/create.invoice.detail.interface';

export class CreateInvoiceDetailDto implements ICreateInvoiceDetailDto {
    description: string;
    qty: number;
    price: number;
    totalLine: number;

    constructor(data?: ICreateInvoiceDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.description = _data["description"];
            this.qty = _data["qty"];
            this.price = _data["price"];
            this.totalLine = _data["totalLine"];
        }
    }

    static fromJS(data: any): CreateInvoiceDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateInvoiceDetailDto();
        result.init(data);
        return result;
    }
}