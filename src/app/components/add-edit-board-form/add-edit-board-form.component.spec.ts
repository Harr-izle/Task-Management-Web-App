import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoardFormComponent } from './add-edit-board-form.component';

describe('AddEditBoardFormComponent', () => {
  let component: AddEditBoardFormComponent;
  let fixture: ComponentFixture<AddEditBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBoardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
