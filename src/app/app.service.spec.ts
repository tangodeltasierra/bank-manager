import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        IonicStorageModule.forRoot(),
        RouterTestingModule
      ]
    })
  );

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const service: AppService = TestBed.get(AppService);
    // expect(service.login('username', 'password')).toBeTruthy();
  });
});
