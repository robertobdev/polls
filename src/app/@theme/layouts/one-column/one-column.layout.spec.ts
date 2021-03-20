import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneColumnLayout } from './one-column.layout';

describe('OneColumnLayout', () => {
  let component: OneColumnLayout;
  let fixture: ComponentFixture<OneColumnLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneColumnLayout],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneColumnLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
