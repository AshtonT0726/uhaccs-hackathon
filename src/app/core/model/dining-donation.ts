export class DiningDonation {
  public id: number;
  public date: string;
  public location: string;
  public meal: string;
  public color?: any;
}

export class HostDonation {
  hostId: number;
  diningDonations: DiningDonation[];
}