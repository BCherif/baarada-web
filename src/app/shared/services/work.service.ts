import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/base/i.response.model";

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  readonly serviceURL: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceURL = environment.apiUrl + '/works';
  }

  findByPage(page?, size?): Observable<any> {
    page = page || 0;
    size = size || 10;
    return this._httpClient.get<any>(this.serviceURL + '/page?page=' + page + '&size=' + size, {});
  }

  findAll(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL);
  }

  getById(id: number): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL + '/' + id);
  }

  create(obj: FormData): Observable<IResponse> {
    return this._httpClient.post<IResponse>(this.serviceURL + "/save", obj);
  }

  update(obj: FormData): Observable<IResponse> {
    return this._httpClient.put<IResponse>(this.serviceURL + "/update", obj);
  }

  getImage(url: string) {
    return this.serviceURL + "/download/" + url;
  }

}
