import { ITermDto } from './../interfaces/term.interface';
import * as moment from 'moment';

export class TermDto implements ITermDto {
    id: number;
    name: string;
    days: number;
    creationTime: moment.Moment;

    constructor(data?: ITermDto) {
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
            this.name = _data["name"];
            this.days = _data["days"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): TermDto {
        data = typeof data === 'object' ? data : {};
        let result = new TermDto();
        result.init(data);
        return result;
    }
}