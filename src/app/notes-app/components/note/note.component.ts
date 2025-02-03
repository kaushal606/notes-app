import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotesHighlighterComponent } from '../notes-highlighter/notes-highlighter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoteItem } from '../../notes-app.component';
import { GroqAiService } from '../../services/groq-ai.service';
import { ChatCompletion } from '../../model/ai.model';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-note',
  imports: [NotesHighlighterComponent, MatIconModule, MatButtonModule, CommonModule, MatMenuModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onLock = new EventEmitter<number>();
  @Output() onUnlock = new EventEmitter<string>();
  @Input() noteData!: NoteItem;
  noteTitle: string = '';
  queryPrefix: string = 'Generate a short title for the given description:';

  constructor(private groqAiService: GroqAiService) {
    
  }

  ngOnInit() {
    this.groqAiService.getKeyTerms(this.queryPrefix + this.noteData.noteText).subscribe((response: ChatCompletion) => {
      const res: any = response.choices[0].message.content;
      this.noteTitle = JSON.parse(res);
    });
  }
  

  edit() {
    this.onEdit.emit();
  }

  delete() {
    this.onDelete.emit();
  }

  lock() {
    this.onLock.emit();
  }

  unlock() {
    this.onUnlock.emit();
  }

}
