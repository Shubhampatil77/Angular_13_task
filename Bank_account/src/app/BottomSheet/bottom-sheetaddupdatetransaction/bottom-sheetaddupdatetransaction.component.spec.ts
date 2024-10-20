import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetaddupdatetransactionComponent } from './bottom-sheetaddupdatetransaction.component';

describe('BottomSheetaddupdatetransactionComponent', () => {
  let component: BottomSheetaddupdatetransactionComponent;
  let fixture: ComponentFixture<BottomSheetaddupdatetransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomSheetaddupdatetransactionComponent]
    });
    fixture = TestBed.createComponent(BottomSheetaddupdatetransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
