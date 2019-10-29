import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ClientDetails from '../common/ClientDetails';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  accountDetails: ClientDetails;

  constructor(
    private router: ActivatedRoute,
    private auth: AuthService,
    private acc: AccountService,
    private modalController: ModalController
  ) {
    this.accountDetails = null;
  }

  ngOnInit() {
    this.router.snapshot.data.data.subscribe(
      (data: ClientDetails) => (this.accountDetails = data)
    );
  }

  async viewAccount(data?: any) {
    const modal = await this.modalController.create({
      component: DashboardComponent,
      componentProps: {
        dismiss: () => modal.dismiss(),
        data: this.acc.getAccount(data)
      }
    });
    return await modal.present();
  }

  createAccount() {
    const account = Math.floor(Math.random() * 999999999 + 111111111);
    this.acc.createAccount(account).subscribe(acc => {
      this.acc.updateAccounts(account).subscribe(async res => {
        console.log(res);
        const modal = await this.modalController.create({
          component: DashboardComponent,
          componentProps: {
            message: '',
            dismiss: () => modal.dismiss(),
            data: this.acc.getAccount(account)
          }
        });
        await modal.present();
      });
    });
  }
}
