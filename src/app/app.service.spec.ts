import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service.login('username', 'password')).toBeTruthy();

  });

});
