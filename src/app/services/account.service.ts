import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import VerifyPassword from '../common/VerifyPassword';
import Account from '../common/Account';
import { map } from 'rxjs/operators';
import ClientDetails from '../common/ClientDetails';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  idToken: string;
  localId: string;
  accounts: number[];
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/';
  clientDetails: ClientDetails;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.auth.currentUser().subscribe((authData: string) => {
      const authRes = JSON.parse(authData) as VerifyPassword;
      this.idToken = authRes.idToken;
      this.localId = authRes.localId;
      this.http
        .get(
          `${this.apiUrl}clients/${authRes.localId}.json?auth=${authRes.idToken}`
        )
        .subscribe((data: ClientDetails) => {
          this.accounts = data.accounts;
          this.clientDetails = data;
        });
    });
  }

  public createAccount(account?: number) {
    return this.http.put(
      `${this.apiUrl}accounts/${account}.json?auth=${this.idToken}`,
      {
        overdraft: 0,
        balance: 0
      }
    );
  }

  public updateAccounts(account) {
    this.clientDetails.accounts.push(account);
    return this.http.put(
      `${this.apiUrl}clients/${this.localId}.json?auth=${this.idToken}`,
      this.clientDetails
    );
  }

  public getAccount(account: number) {
    return this.http
      .get(`${this.apiUrl}accounts/${account}.json?auth=${this.idToken}`)
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
      `${this.apiUrl}accounts/${account.accountNumber}.json?auth=${this.idToken}`,
      {
        overdraft: account.overdraft,
        balance: account.balance
      }
    );
  }
}
