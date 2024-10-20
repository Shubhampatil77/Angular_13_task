import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetaddBankAccComponent } from './bottom-sheetadd-bank-acc.component';

describe('BottomSheetaddBankAccComponent', () => {
  let component: BottomSheetaddBankAccComponent;
  let fixture: ComponentFixture<BottomSheetaddBankAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomSheetaddBankAccComponent]
    });
    fixture = TestBed.createComponent(BottomSheetaddBankAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
