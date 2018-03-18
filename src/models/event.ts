import { Time } from "@angular/common";

export interface Event {
    id: Number,
    name: String,
    pretty_name: String,
    date: Date,
    start_time: Time,
    end_date?: Date,
    end_time?: Time,
    active: boolean,
    deleted_at?: Date
}