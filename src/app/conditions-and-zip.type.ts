import {CurrentConditions} from './current-conditions/current-conditions.type';

export interface ConditionsAndZip {
    zip: string;
    data: CurrentConditions;
}

export interface LocationUpdate {
    action : string;
    zip : string;
}

export interface TabTitle {
    title : string;
    zip : string;
}