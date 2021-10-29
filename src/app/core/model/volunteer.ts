import { DonationEvent } from "./donation-event";

export class Volunteer {
    public id: number;
    public name: string;
    public location: string;
    public email: string;
    public phone: string;
    public eventsAttended: number;
    public milesRun: number;
    public rescheduled: number;
    public foodInPound: number;
    public foodInMeals: number;
    public pastEvents: DonationEvent[];
    public upcomingEvents: DonationEvent[];
}


  