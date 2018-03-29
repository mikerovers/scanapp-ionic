import { Time } from "@angular/common";
import { Contingent } from "./contingent";

export interface Event {
    id: number,
    name: string,
    pretty_name: string,
    date: Date,
    start_time: Time,
    end_date?: Date,
    end_time?: Time,
    active: boolean,
    deleted_at?: Date,
    contingents?: Contingent
}