import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private app: AppService) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }

  public userLogin(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.app.login(email, password);
  }

}
