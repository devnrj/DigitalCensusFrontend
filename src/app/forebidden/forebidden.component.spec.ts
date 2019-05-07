import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForebiddenComponent } from './forebidden.component';

describe('ForebiddenComponent', () => {
  let component: ForebiddenComponent;
  let fixture: ComponentFixture<ForebiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForebiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForebiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
