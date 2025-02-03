import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-password-dialog',
  imports: [CommonModule, MatFormFieldModule, MatButtonModule,
    MatIconModule, MatInputModule, FormsModule],
  templateUrl: './note-password-dialog.component.html',
  styleUrl: './note-password-dialog.component.scss'
})
export class NotePasswordDialogComponent {
  password: string = '';
  hide: boolean = true; // To toggle password visibility
  dialogType:boolean;

  constructor(public dialogRef: MatDialogRef<NotePasswordDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { isEncrypted: boolean } ) {
    this.dialogType = data.isEncrypted;
  }

  onCancel(): void {
    this.dialogRef.close(null); // Close dialog without saving
  }

  onSave(): void {
    this.dialogRef.close(this.password); // Pass the password back to the parent
  }
}