import { ICreateTermDto } from './../interfaces/create.term.interface';

export class CreateTermDto implements ICreateTermDto {
    name: string;
    days: number;

    constructor(data?: ICreateTermDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.days = _data["days"];
        }
    }

    static fromJS(data: any): CreateTermDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTermDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["days"] = this.days;
        return data;
    }

    clone(): CreateTermDto {
        const json = this.toJSON();
        let result = new CreateTermDto();
        result.init(json);
        return result;
    }
}