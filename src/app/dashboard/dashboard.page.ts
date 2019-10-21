import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import VerifyPassword from '../common/VerifyPassword';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  apiUrl = 'https://momentum-retail-practical-test.firebaseio.com/';
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private http: HttpClient, private app: AppService) { }

  ngOnInit() {
    this.app.currentUser().subscribe(auth => {
      auth = JSON.parse(auth) as VerifyPassword;
      // this.http.get(`${this.apiUrl}clients/${auth.localId}.json?auth=${auth.idToken}`).subscribe(res => console.log(res));
    });


  }

}
