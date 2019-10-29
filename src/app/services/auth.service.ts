import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { of, from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import LoginError from '../common/LoginError';
import VerifyPassword from '../common/VerifyPassword';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  dashboard = 'https://momentum-retail-practical-test.firebaseio.com/';
  onboard =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  public async login(email: string, password: string) {
    const loading = await this.loadingController.create({
      message: 'Please Wait...'
    });
    await loading.present();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http
      .post(
        this.onboard,
        JSON.stringify({
          ...{ email },
          ...{ password },
          returnSecureToken: true
        }),
        httpOptions
      )
      .subscribe(
        (data: VerifyPassword) => this._handleLogin(data),
        (error: { error: LoginError }) => this._handleLoginError(error.error),
        async () => await loading.dismiss()
      );
  }

  private _handleLoginError(err: LoginError) {
    // @TODO: SHOW LOGIN ERRORS
    console.log(err);
  }

  private _handleLogin(data: VerifyPassword) {
    if (data.registered === true) {
      this.storage.set('auth', JSON.stringify(data)).then(res => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return from(this.storage.get('auth')).pipe(
      map(data => {
        data = JSON.parse(data) as VerifyPassword;
        if (data.registered) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }),
      catchError(err => of(false))
    );
  }

  public currentUser() {
    return from(this.storage.get('auth'));
  }

  public getClientDetails() {
    return this.currentUser().pipe(
      map((authData: string) => {
        const auth = JSON.parse(authData) as VerifyPassword;
        return this.http.get(
          `${this.dashboard}clients/${auth.localId}.json?auth=${auth.idToken}`
        );
      })
    );
  }

  public logoutUser() {
    this.storage
      .remove('auth')
      .then(res => {
        window.location.href = '/home';
      })
      .catch(error => console.log(error));
  }
}
