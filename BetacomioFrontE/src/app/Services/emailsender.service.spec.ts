import { TestBed } from '@angular/core/testing';

import { EmailsenderService } from './emailsender.service';

describe('EmailsenderService', () => {
  let service: EmailsenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailsenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
