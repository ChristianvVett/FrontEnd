import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguedtComponent } from './cataloguedt.component';

describe('CataloguedtComponent', () => {
  let component: CataloguedtComponent;
  let fixture: ComponentFixture<CataloguedtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CataloguedtComponent]
    });
    fixture = TestBed.createComponent(CataloguedtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
