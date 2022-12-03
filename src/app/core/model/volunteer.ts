import { DonationEvent } from "./donation-event";

export class Volunteer {
    public id: number;
    public name: string;
    public location: string;
    public email: string;
    public phone: string;
    public mealsHosted: number;
    public numberGuests: number;
    public moneySaved: number;
    public pastEvents: DonationEvent[];
    public upcomingEvents: DonationEvent[];
}


  