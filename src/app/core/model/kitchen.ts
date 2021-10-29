export class Kitchen {
  public id: number;
  public name: string;
  public address: string;
  public location: string;
  public phone: string;
  public description: string;
  public email?: string;
  public group: KitchenGroup;
  // Average weight of food received per month.
  public monthAvg: number;
}

export class KitchenGroup {
  public id: number;
  public name: string;
  public kitchens?: Kitchen[];
}
