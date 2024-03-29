import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/base/i.response.model";

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {
  readonly serviceURL: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceURL = environment.apiUrl + '/practitioners';
  }

  findByPage(page?, size?): Observable<any> {
    page = page || 0;
    size = size || 10;
    return this._httpClient.get<any>(this.serviceURL + '/page/all?page=' + page + '&size=' + size, {});
  }

  create(obj: FormData): Observable<IResponse> {
    return this._httpClient.post<IResponse>(this.serviceURL + "/save", obj);
  }

  update(obj: FormData): Observable<IResponse> {
    return this._httpClient.put<IResponse>(this.serviceURL + "/update", obj);
  }

  activatePractioner(practitioner_id: number): Observable<IResponse> {
  return this._httpClient.get<IResponse>(`${this.serviceURL}/${practitioner_id}/enable`)
  }

  getImage(url: string) {
    return this.serviceURL + "/download/" + url + "/avatar";
  }

}
