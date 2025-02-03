import { CommonModule } from '@angular/common';
import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NotesPanelComponent } from './components/notes-panel/notes-panel.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NotesHighlighterComponent } from "./components/notes-highlighter/notes-highlighter.component";
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoteComponent } from "./components/note/note.component";
import { EncryptionService } from './services/encryption.service';
import { MatDialog } from '@angular/material/dialog';
import { NotePasswordDialogComponent } from './components/note-password-dialog/note-password-dialog.component';

export interface NoteItem {
  id: number;
  noteText: string;
  noteColor: string;
  encrypted: boolean;
}

@Component({
  selector: 'app-notes-app',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotesPanelComponent, MatToolbar, NgxEditorModule, MatExpansionModule, MatIconModule, MatButtonModule, NoteComponent],
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.scss']
})
export class NotesAppComponent {
  public notesForm: FormGroup;
  public noteColorList: string[] = ['Lavender', 'MistyRose', 'PaleTurquoise ']
  public notesList: NoteItem[] = [];
  public editData: any;
  password: string = '';
  
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  constructor(private fb: FormBuilder, private encryptionService: EncryptionService, private dialog: MatDialog) {
    this.notesForm = this.createForm();
    this.editor = new Editor();
  }
  
  closePanel(panel: MatExpansionPanel) {
    panel.close();
  }
  
  openPanel(panel: MatExpansionPanel) {
    panel.open();
  }
  
  
  ngOnInit(): void {
    this.notesList = this.load([])
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  load<T>(defaultValue: T): T {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : defaultValue;
  }

  private createForm() {
    return this.fb.group({
      id: [''],
      noteText: ['', [Validators.required]],
      encrypted: false,
    });
  }

  addNote(): void {
    if(!this.notesForm.controls['id'].value){
      this.notesForm.controls['id'].setValue(this.notesList.length + 1);
      this.notesList.push(this.notesForm.value);
    } else {
      const noteIndex: number = this.notesList.indexOf(this.editData);
      this.notesList[noteIndex] = this.notesForm.value;
      this.editData = null;
    }
    this.saveNotes();
    this.notesForm.reset();
  }

  editNote(editNoteData: NoteItem): void {
    this.editData = editNoteData;
    this.notesForm.setValue({
      id: editNoteData.id,
      noteText: editNoteData.noteText,
      encrypted: editNoteData.encrypted
    });
    this.saveNotes();
  }

  deleteNote(deleteNoteId: number): void {
    this.notesList.filter((item, index) => {
      if(item.id === deleteNoteId) {
        this.notesList.splice(index, 1);
      }
    });
    this.saveNotes();
  }

  encryptNote(noteId: number, password: string) {
    const note = this.notesList.find(n => n.id === noteId);
    if (note) {
      note.noteText = this.encryptionService.encrypt(note.noteText, password);
      note.encrypted = true;
    }
  }

  decryptNote(noteId: number, password: string) {
    const note = this.notesList.find(n => n.id === noteId);
    if (note && note.encrypted) {
      const decryptedContent = this.encryptionService.decrypt(note.noteText, password);
      if (decryptedContent) {
        note.noteText = decryptedContent;
        note.encrypted = false;
      } else {
        alert('Incorrect password!');
      }
    }
  }

  openPasswordDialog(id: number, isEncrypted: boolean): void {
    const dialogRef = this.dialog.open(NotePasswordDialogComponent, {
      width: '500px',
      height: '250px',
      data: {
        isEncrypted: isEncrypted
      }
    });

    dialogRef.afterClosed().subscribe((password) => {
      if (password) {
        if(isEncrypted) {
          this.decryptNote(id, password);
          this.saveNotes();
        } else {
          this.encryptNote(id, password)
          this.saveNotes();
        } 
        console.log('Password:', password); // Save or use the password as needed
      } else {
        console.log('Password input was cancelled');
      }
    });
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notesList));
  }

}