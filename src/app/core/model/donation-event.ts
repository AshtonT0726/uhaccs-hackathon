import { DailyDonation } from "./daily-donation";
import { Donor } from "./donor";
import { Kitchen } from "./kitchen";
import { Volunteer } from "./volunteer";

export class DonationEvent {
    public id: number;
    public date: string;
    public dd: number; // Date
    public month: string;
    public day: string // Week day
    public donor: Donor;
    public kitchen: Kitchen;
    public volunteer?: Volunteer;
    public donations?: DailyDonation[];
}