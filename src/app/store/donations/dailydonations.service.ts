import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { url } from "../../core/model/constants";
import { DailyDonation } from "../../core/model/daily-donation";

@Injectable()
export class DailyDonationsService {
  constructor(private readonly http: HttpClient) {}

  getDailyDonation(id: number): Observable<DailyDonation> {
    return this.http.get<DailyDonation>(url("daily-donations/`${id}`"));
  }

  getByDonorIdAndMonth(
    donorId: number,
    month: string
  ): Observable<DailyDonation[]> {
    let params = new HttpParams();
    params.append("donorId", `${donorId}`);
    params.append("month", `${month}`);
    return this.http.get<DailyDonation[]>(url("daily-donations"), { params });
  }

  getByDonorIdAndDate(
    donorId: number,
    date: string
  ): Observable<DailyDonation[]> {
    let params = new HttpParams();
    params.append("donorId", `${donorId}`);
    params.append("date", `${date}`);
    return this.http.get<DailyDonation[]>(url("daily-donations"), { params });
  }

  createDailyDonation(
    donorId: number,
    DailyDonation: DailyDonation
  ): Observable<DailyDonation> {
    return this.http.post<DailyDonation>(
      url("food-donors/`${donorId}`/daily-donations"),
      DailyDonation
    );
  }

  deleteDailyDonation(id: number): Observable<any> {
    return this.http
      .delete(url("daily-donations/`${id}`"))
      .pipe(map((response) => response as any));
  }

  updateDailyDonation(
    DailyDonation: DailyDonation
  ): Observable<DailyDonation> {
    return this.http.put<DailyDonation>(url("daily-donations/`${id}`"), DailyDonation);
  }
}
