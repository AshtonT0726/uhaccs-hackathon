import { DailyDonation } from "./daily-donation";
import { Donor } from "./donor";
import { DiningHall } from "./dining-hall";
import { Volunteer } from "./volunteer";
import { Guest } from "./guest";
import {Kitchen} from "./kitchen";

export class DonationEvent {
    public id: number;
    public date: string;
    public dd: number; // Date
    public month: string;
    public day: string // Week day
    public donor?: Donor;
    public diningHall: DiningHall;
    public guest: Guest;
    public kitchen?: Kitchen;
    public volunteer?: Volunteer;
    public donations?: DailyDonation[];
}