import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsheetDeleteBankAccountComponent } from './bottomsheet-delete-bank-account.component';

describe('BottomsheetDeleteBankAccountComponent', () => {
  let component: BottomsheetDeleteBankAccountComponent;
  let fixture: ComponentFixture<BottomsheetDeleteBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottomsheetDeleteBankAccountComponent]
    });
    fixture = TestBed.createComponent(BottomsheetDeleteBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
