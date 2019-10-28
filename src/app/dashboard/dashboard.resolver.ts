import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import VerifyPassword from '../common/VerifyPassword';
import { AppService } from '../app.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/';

  constructor(private http: HttpClient, private app: AppService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.app.currentUser().pipe(
      map((authData: string) => {
        const auth = JSON.parse(authData) as VerifyPassword;
        return this.http.get(
          `${this.apiUrl}clients/${auth.localId}.json?auth=${auth.idToken}`
        );
      })
    );
    // return this.service.getHero(route.paramMap.get('id'));
  }
}
