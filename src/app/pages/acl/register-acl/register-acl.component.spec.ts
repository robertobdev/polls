import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAclComponent } from './register-acl.component';

describe('RegisterAclComponent', () => {
  let component: RegisterAclComponent;
  let fixture: ComponentFixture<RegisterAclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
