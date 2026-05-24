import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  // URL base de la API sugerida en el PDF
  private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';

  constructor(private http: HttpClient) { }

  // Fíjate que ahora retornamos Observable<Blob> en lugar de un Modelo o Interfaz
  convertirTexto(texto: string, voz: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'a173f6b039msh82974f767656fdfp14d5c0jsna662ec1a3504', // Reemplaza con tu clave de RapidAPI
      'X-RapidAPI-Host': 'open-ai-text-to-speech1.p.rapidapi.com',
      'Content-Type': 'application/json'
    });

    // Armamos el cuerpo (body) de la petición POST
    const body = {
      model: 'tts-1',
      input: texto,
      voice: voz,
      instructions: 'Speak clearly and naturally.'
    };

    // CRÍTICO: Le indicamos a Angular que la respuesta será un archivo (blob)
    return this.http.post(this.apiUrl, body, { 
      headers: headers, 
      responseType: 'blob' 
    });
  }
}
