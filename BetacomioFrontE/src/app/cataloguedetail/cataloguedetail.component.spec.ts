import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguedetailComponent } from './cataloguedetail.component';

describe('CataloguedetailComponent', () => {
  let component: CataloguedetailComponent;
  let fixture: ComponentFixture<CataloguedetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CataloguedetailComponent]
    });
    fixture = TestBed.createComponent(CataloguedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
