import { InvoiceDto } from '../../dtos/invoice.dto';

export interface IInvoiceDtoPagedResultDto {
    items: InvoiceDto[] | undefined;
    totalCount: number;
}

export class InvoiceDtoPagedResultDto implements IInvoiceDtoPagedResultDto {
    items: InvoiceDto[] | undefined;
    totalCount: number;

    constructor(data?: IInvoiceDtoPagedResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data)) {
                this.items = [] as any;
                for (let item of _data)
                    this.items.push(InvoiceDto.fromJS(item));
            }
            this.totalCount = _data.length;
        }
    }

    static fromJS(data: any): InvoiceDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new InvoiceDtoPagedResultDto();
        result.init(data);
        return result;
    }
}
