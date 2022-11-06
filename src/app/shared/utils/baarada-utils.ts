import {Injectable} from '@angular/core';
import {AuthBody} from './auth-body';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../models/entities/user.model';

@Injectable()
export class BaaradaUtils {

  constructor() {
  }

  httpHeaders() {
    const token: string = this.getToken();
    let headers = new HttpHeaders();

    if (token) { // token is present
      headers = headers.set('authorization', 'Bearer ' + token);
    }
    return {
      headers: headers
    };
  }

  getToken(): string {
    let authBody: AuthBody = this.getAuthBody();
    if (authBody) {
      return authBody.token;
    } else {
      return null;
    }
  }

  getAppUser(): User {
    let authBody: AuthBody = this.getAuthBody();
    if (authBody) {
      return authBody.user;
    } else {
      return null;
    }
  }

  getAuthBody(): AuthBody {
    if (!localStorage.getItem('app-token')) {
      return null;
    } else {
      return JSON.parse(atob(localStorage.getItem('app-token')));
    }
  }

  uploadOption() {
    const token: string = this.getToken();
    let _headers = new HttpHeaders();
    if (token) {
      _headers = _headers.set('enctype', 'multipart/form-data');
      _headers = _headers.set('authorization', 'Bearer ' + token);
    }
    return {headers: _headers};
  }

  getRoleNames(): string[] {
    let names = [];
    let user: User = this.getAppUser();
    if (user) {
      user.roles.forEach(role => {
        names.push(role.name);
      });
    }
    return names;
  }


}
