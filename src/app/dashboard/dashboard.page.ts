import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import ClientDetails from '../common/ClientDetails';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  accountDetails: ClientDetails = null;

  constructor(
    private router: ActivatedRoute,
    private app: AppService,
    private menu: MenuController
  ) {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    this.router.snapshot.data.data.subscribe(
      (data: ClientDetails) => (this.accountDetails = data)
    );
  }
}
