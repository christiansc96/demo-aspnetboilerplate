import { TermDto } from '../../dtos/term.dto';

export interface ITermDtoPagedResultDto {
    items: TermDto[] | undefined;
    totalCount: number;
}

export class TermDtoPagedResultDto implements ITermDtoPagedResultDto {
    items: TermDto[] | undefined;
    totalCount: number;

    constructor(data?: ITermDtoPagedResultDto) {
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
                    this.items.push(TermDto.fromJS(item));
            }
            this.totalCount = _data.length;
        }
    }

    static fromJS(data: any): TermDtoPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new TermDtoPagedResultDto();
        result.init(data);
        return result;
    }
}
