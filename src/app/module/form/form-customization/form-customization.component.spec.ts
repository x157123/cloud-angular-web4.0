import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomizationComponent } from './form-customization.component';

describe('FormCustomizationComponent', () => {
  let component: FormCustomizationComponent;
  let fixture: ComponentFixture<FormCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCustomizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
