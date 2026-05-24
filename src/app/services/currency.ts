import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CurrencyResponse } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // Ruta local del proxy de desarrollo para evitar CORS desde el navegador.
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // Método que recibe cuánto, de qué moneda, a qué moneda
  convertirDivisa(amount: number, from: string, to: string): Observable<CurrencyResponse> {
    const urlCompleta = `${this.apiUrl}/v6/latest/${from}`;

    return this.http.get<{ result: string; base_code: string; rates: Record<string, number> }>(urlCompleta).pipe(
      map((response) => ({
        success: true,
        query: {
          from,
          to,
          amount,
        },
        result: (response.rates[to] ?? 1) * amount,
      }))
    );
  }
}
