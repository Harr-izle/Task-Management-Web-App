import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFormComponent } from './create-edit-form.component';

describe('CreateEditFormComponent', () => {
  let component: CreateEditFormComponent;
  let fixture: ComponentFixture<CreateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
