import { Component, OnInit, Input } from '@angular/core';
import Account from '../common/Account';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() dismiss: any;
  @Input() data: any;
  @Input() message: string;
  account = { accountNumber: 0 } as Account;
  accountForm: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private accService: AccountService
  ) {
    this.accountForm = this.fb.group({
      amount: []
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please Wait...'
    });
    await loading.present();
    this.data.subscribe(
      (account: Account) => (this.account = account),
      err => {},
      async () => await loading.dismiss()
    );
  }

  withdrawCash() {
    const account = this.account;
    account.balance = account.balance - this.accountForm.get('amount').value;
    this.saveAccount(account);
  }

  depositCash() {
    const account = this.account;
    account.balance = account.balance + this.accountForm.get('amount').value;
    this.saveAccount(account);
  }

  private saveAccount(account: Account) {
    this.accService.updateAccount(account).subscribe(res => {
      this.account = {
        ...this.account,
        ...res
      };
      this.accountForm.get('amount').setValue(null);
    });
  }
}
