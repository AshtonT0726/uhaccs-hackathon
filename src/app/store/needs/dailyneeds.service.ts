import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { url } from "../../core/model/constants";
import { DailyNeed } from "../../core/model/daily-need";


@Injectable()
export class DailyNeedsService {
  constructor(private readonly http: HttpClient) {}

  getDailyNeed(id: number): Observable<DailyNeed> {
    return this.http.get<DailyNeed>(url("daily-needs/`${id}`"));
  }

  getByPantryIdAndMonth(
    pantryId: number,
    month: string
  ): Observable<DailyNeed[]> {
    let params = new HttpParams();
    params.append("pantryId", `${pantryId}`);
    params.append("month", `${month}`);
    return this.http.get<DailyNeed[]>(url("daily-needs"), { params });
  }

  getByPantryIdAndDate(
    pantryId: number,
    date: string
  ): Observable<DailyNeed[]> {
    let params = new HttpParams();
    params.append("pantryId", `${pantryId}`);
    params.append("date", `${date}`);
    return this.http.get<DailyNeed[]>(url("daily-needs"), { params });
  }

  createDailyNeed(
    pantryId: number,
    dailyNeed: DailyNeed
  ): Observable<DailyNeed> {
    return this.http.post<DailyNeed>(
      url("food-pantries/`${pantryId}`/daily-needs"),
      dailyNeed
    );
  }

  deleteDailyNeed(id: number): Observable<any> {
    return this.http
      .delete(url("daily-needs/`${id}`"))
      .pipe(map((response) => response as any));
  }

  updateDailyNeed(
    dailyNeed: DailyNeed
  ): Observable<DailyNeed> {
    return this.http.put<DailyNeed>(url("daily-needs/`${id}`"), dailyNeed);
  }
}
