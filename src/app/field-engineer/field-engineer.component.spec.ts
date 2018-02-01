import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEngineerComponent } from './field-engineer.component';

describe('FieldEngineerComponent', () => {
  let component: FieldEngineerComponent;
  let fixture: ComponentFixture<FieldEngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
