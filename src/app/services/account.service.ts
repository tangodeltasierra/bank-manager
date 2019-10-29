import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import VerifyPassword from '../common/VerifyPassword';
import Account from '../common/Account';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  idToken: string;
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/accounts/';
  // <account_number>.json?auth=<idToken_from_login_response>';

  constructor(private auth: AuthService, private http: HttpClient) {
    this.auth.currentUser().subscribe((authData: string) => {
      const authRes = JSON.parse(authData) as VerifyPassword;
      this.idToken = authRes.idToken;
    });
  }

  public createAccount(account?: number) {
    account = account || Math.floor(Math.random() * 999999999 + 111111111);
    return this.http
      .put(`${this.apiUrl}${account}.json?auth=${this.idToken}`, {
        overdraft: 0,
        balance: 0
      })
      .pipe(
        map(res => {
          return this.getAccount(account);
        })
      );
  }

  public getAccount(account: number) {
    return this.http
      .get(`${this.apiUrl}${account}.json?auth=${this.idToken}`)
      .pipe(
        map(
          accountData =>
            ({
              accountNumber: account,
              ...accountData
            } as Account)
        )
      );
  }

  public updateAccount(account: Account) {
    return this.http.put(
      `${this.apiUrl}${account.accountNumber}.json?auth=${this.idToken}`,
      {
        overdraft: account.overdraft,
        balance: account.balance
      }
    );
  }
}
