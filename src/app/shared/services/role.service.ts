import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/base/i.response.model";
import {User} from "../models/entities/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly serviceURL: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceURL = environment.apiUrl + '/roles';
  }

  findByPage(page?, size?): Observable<any> {
    page = page || 0;
    size = size || 10;
    return this._httpClient.get<any>(this.serviceURL + '/page?page=' + page + '&size=' + size, {});
  }

  findAll(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL, {});
  }

  getByName(name: string): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL + '/by-name/' + name, {});
  }

  create(user: User): Observable<IResponse> {
    return this._httpClient.post<IResponse>(this.serviceURL + "/create", user, {});
  }

  update(user: User): Observable<IResponse> {
    return this._httpClient.put<IResponse>(this.serviceURL + "/update", user, {});
  }
}
