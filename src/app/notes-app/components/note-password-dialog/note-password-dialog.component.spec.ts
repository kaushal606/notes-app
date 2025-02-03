import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePasswordDialogComponent } from './note-password-dialog.component';

describe('NotePasswordDialogComponent', () => {
  let component: NotePasswordDialogComponent;
  let fixture: ComponentFixture<NotePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePasswordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
