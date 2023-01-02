import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/base/i.response.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly serviceURL: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceURL = environment.apiUrl + '/dashboards';
  }


  initDash(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL + '/init');
  }


}
