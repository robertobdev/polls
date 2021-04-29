import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAclComponent } from './list-acl.component';

describe('ListAclComponent', () => {
  let component: ListAclComponent;
  let fixture: ComponentFixture<ListAclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
