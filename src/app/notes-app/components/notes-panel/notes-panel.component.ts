import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-notes-panel',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule, MatDividerModule],
  templateUrl: './notes-panel.component.html',
  styleUrl: './notes-panel.component.scss'
})
export class NotesPanelComponent {
  @Input() listLength: number = 0;
  @Input() isExpanded: boolean = false;
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  windowSize: number = window.innerWidth;

  ngOnChanges() {
    if (this.isExpanded) {
      this.drawer.open();
    } else if(this.listLength == 0) {
      this.drawer.close();
    }
  }
  
  ngAfterViewInit() {
    if(this.listLength == 0) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }

  }

}
