import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLlmDialog } from './add-llm-dialog';

describe('AddLlmDialog', () => {
  let component: AddLlmDialog;
  let fixture: ComponentFixture<AddLlmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLlmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLlmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
