import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankAccountComponent } from './edit-bank-account.component';

describe('EditBankAccountComponent', () => {
  let component: EditBankAccountComponent;
  let fixture: ComponentFixture<EditBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBankAccountComponent]
    });
    fixture = TestBed.createComponent(EditBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
