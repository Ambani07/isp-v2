import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();
class DecodedToken{
  exp: number = 0;
  username: string = '';
  email: string = '';
}

@Injectable()
export class AuthService {

  private decodedToken;
  

  constructor(private http: HttpClient){
    this.decodedToken = JSON.parse(localStorage.getItem('isp_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string{

    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('isp_auth', token);
    localStorage.setItem('isp_meta',  JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    // compare current time with the expiry date of the decoded token
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData): Observable<any> {
      return this.http.post('api/v1/users/register', userData);
  }

  public login(userData): Observable<any>{
    
    return this.http.post('api/v1/users/auth', userData).pipe(map(
      (token: any) => {
        return this.saveToken(token);
      }
    ));
  }

  public isAuthenticated(): boolean {

    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string{
    return localStorage.getItem('isp_auth');
  }

  public logout() {
    // delete localStorage data
    localStorage.removeItem('isp_auth');
    localStorage.removeItem('isp_meta');

    this.decodedToken = new DecodedToken();
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }

  public getUserEmail(): string{
    return this.decodedToken.email;
  }

  

}