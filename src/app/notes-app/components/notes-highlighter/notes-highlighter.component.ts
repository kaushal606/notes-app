import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { ChatCompletion } from '../../model/ai.model';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { GroqAiService } from '../../services/groq-ai.service';

@Component({
  selector: 'app-notes-highlighter',
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './notes-highlighter.component.html',
  styleUrl: './notes-highlighter.component.scss'
})
export class NotesHighlighterComponent implements OnChanges {

  @Input() note: string = '';
  @Input() id: number = 0;
  highlightedText!: any;
  queryPrefix: string = 'Identify key terms in the following text and just return the keyWords and its description in the form of an array of objects:';

  constructor(private groqAiService: GroqAiService) { }

  ngOnChanges(): void {
    if (this.note) {
      this.groqAiService.getKeyTerms(this.queryPrefix + this.note).subscribe((response: ChatCompletion) => {
        const res: any = response.choices[0].message.content;
        this.highlightedText = this.applyHighlights(this.note, JSON.parse(res));
      });
    }
  }

  applyHighlights(note: string, terms: any[]): string {
    const escapedTerms = terms.map((term) =>
      term?.keyword?.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    );
    const regex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
    return note.replace(regex, (match) => {
      const term = terms.find((t) => t.keyword.toLowerCase() === match.toLowerCase());
      return `<mark title="${term?.description || ''}" style="cursor: pointer;">${match}</mark>`;
    });

  }

}
