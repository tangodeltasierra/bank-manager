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

  async createAccount() {
    const modal = await this.modalController.create({
      component: DashboardComponent,
      componentProps: {
        message: '',
        dismiss: () => modal.dismiss(),
        data: this.acc.createAccount()
      }
    });
    return await modal.present();
  }
}
