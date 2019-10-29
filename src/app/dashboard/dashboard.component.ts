import { Component, OnInit, Input } from '@angular/core';
import Account from '../common/Account';
import { NavParams } from '@ionic/angular';

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

  constructor(navParams: NavParams) {
    navParams
      .get('data')
      .subscribe((account: Account) => (this.account = account));
  }

  ngOnInit() {}
}
