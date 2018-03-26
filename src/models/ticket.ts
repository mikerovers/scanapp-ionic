import { Contingent } from "./contingent";
import { PriceType } from "./pricetype";

export interface Ticket {
    id: number,
    price: number,
    contingent: Contingent,
    pricetype: PriceType
}