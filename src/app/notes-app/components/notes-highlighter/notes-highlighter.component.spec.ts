import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesHighlighterComponent } from './notes-highlighter.component';

describe('NotesHighlighterComponent', () => {
  let component: NotesHighlighterComponent;
  let fixture: ComponentFixture<NotesHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesHighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
