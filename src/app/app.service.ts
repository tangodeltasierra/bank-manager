import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import VerifyPassword from './common/VerifyPassword';
import LoginError from './common/LoginError';
import { Storage } from '@ionic/storage';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService implements CanActivate {

  dashboard = 'https://momentum-retail-practical-test.firebaseio.com/';
  onboard = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y';

  constructor(private http: HttpClient, private storage: Storage) { }

  public login(email: String, password: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post(this.onboard, JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    }), httpOptions).subscribe(
      (data: VerifyPassword) => this._handleLogin(data), 
      (error: {error: LoginError}) => this._handleLoginError(error.error)
    );
  }

  private _handleLoginError(err: LoginError) {
    // @TODO: SHOW LOGIN ERRORS
  }

  private _handleLogin(data: VerifyPassword) {
    if(data.registered === true){
      this.storage.set('auth', JSON.stringify(data)).then(res => {
        window.location.href = '/dashboard';
      });
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @TODO: CHECK AUTH SESSION
    return true;
    // return from(this.storage.get('auth').then((data:VerifyPassword) => data.registered).catch(error => false));
  }

  public currentUser() {
    return from(this.storage.get('auth'));
  }

  public getClientDetails() {
  }

  public logoutUser(){
    this.storage.remove('auth').then(res => {
      window.location.href = '/home';
    }).catch(error => console.log(error))
  }

}
