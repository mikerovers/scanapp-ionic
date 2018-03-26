import { Contact } from './contact';
import { Ticket } from './ticket';

export interface Order {
    id: number,
    event_id: number,
    status: string,
    activated: boolean,
    expired: number,
    payed: boolean,
    contact_information?: Contact,
    tickets?: Ticket[]
}