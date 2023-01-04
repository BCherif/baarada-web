import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/base/i.response.model";
import {User} from "../models/entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly serviceURL: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceURL = environment.apiUrl + '/users';
  }

  findByPage(page?, size?): Observable<any> {
    page = page || 0;
    size = size || 10;
    return this._httpClient.get<any>(this.serviceURL + '/page?page=' + page + '&size=' + size, {});
  }

  findAll(): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL, {});
  }

  getById(id: number): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.serviceURL + '/' + id, {});
  }

  create(user: User): Observable<IResponse> {
    return this._httpClient.post<IResponse>(this.serviceURL + "/create", user, {});
  }

  update(user: User): Observable<IResponse> {
    return this._httpClient.put<IResponse>(this.serviceURL + "/update", user, {});
  }

  disableOrEnable(user: User) {
    if (user.active) {
      return this.disable(user.id);
    } else {
      return this.enable(user.id);
    }
  }

  disable(id: number) {
    return this._httpClient.put(this.serviceURL + '/' + id + '/disable', {});
  }

  enable(id: number) {
    return this._httpClient.put(this.serviceURL + '/' + id + '/enable', {});
  }


}
