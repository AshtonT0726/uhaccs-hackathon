import { DailyDonation } from "./daily-donation";

export class Donor {
    public id: number;
    public name: string;
    public address: string;
    public location: string;
    public phone: string;
    public description?: string;
    public email?: string;
    // Average weight of food donation per month.
    public monthAvg: number;
}