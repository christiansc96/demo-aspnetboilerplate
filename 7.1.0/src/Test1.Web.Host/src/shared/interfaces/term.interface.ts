import * as moment from 'moment';

export interface ITermDto {
    id: number;
    name: string;
    days: number;
    creationTime: moment.Moment;
}