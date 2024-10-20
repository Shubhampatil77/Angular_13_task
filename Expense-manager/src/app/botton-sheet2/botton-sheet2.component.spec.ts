import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonSheet2Component } from './botton-sheet2.component';

describe('BottonSheet2Component', () => {
  let component: BottonSheet2Component;
  let fixture: ComponentFixture<BottonSheet2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottonSheet2Component]
    });
    fixture = TestBed.createComponent(BottonSheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
