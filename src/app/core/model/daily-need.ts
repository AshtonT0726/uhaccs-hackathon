export class DailyNeed {
  public id: number;
  public date: string;
  public category: string;
  public quantity: number;
  public color?: any;
}

export class KitchenNeeds {
  kitchenId: number;
  dailyNeeds: DailyNeed[];
}
