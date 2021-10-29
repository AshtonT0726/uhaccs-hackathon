export class DailyDonation {
  public id: number;
  public date: string;
  public category: string;
  public quantity: number;
  public color?: any;
}

export class DonorDonation {
  donorId: number;
  dailyDonations: DailyDonation[];
}
