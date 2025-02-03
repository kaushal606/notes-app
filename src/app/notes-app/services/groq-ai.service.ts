import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroqAiService {
  
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Replacse with the actual GROQ AI API URL
  private apiKey = environment.groqApiKey; // Replace with your API key

  constructor(private http: HttpClient) {}

  public getKeyTerms(text: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const paylod = {
      "model": "llama-3.3-70b-versatile",
      "messages": [{
          "role": "user",
          "content": text
      }]
      }

    return this.http.post(this.apiUrl, paylod , { headers });
  }
 


}
