import { DiningHall } from "./dining-hall";
import { Volunteer } from "./volunteer";
import { Guest } from "./guest";

export class DonationEvent {
    public id: number;
    public date: string;
    public dd: number; // Date
    public month: string;
    public day: string // Week day
    public diningHall: DiningHall;
    public guest: Guest;
    public volunteer?: Volunteer;
}