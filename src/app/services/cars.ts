import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarMake, CarModel } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'https://car-specs.p.rapidapi.com/v2';

  constructor(private http: HttpClient) {}

  // Centralizamos los headers para no repetir código
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': 'a173f6b039msh82974f767656fdfp14d5c0jsna662ec1a3504',
      'X-RapidAPI-Host': 'car-specs.p.rapidapi.com',
    });
  }
  // 1. Obtener todas las marcas (Maestro)
  getMakes(): Observable<CarMake[]> {
    return this.http.get<CarMake[]>(`${this.apiUrl}/cars/makes`, { headers: this.getHeaders() });
  }

  // 2. Obtener los modelos por el ID de la marca (Detalle)
  getModelsByMake(makeId: string | number): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${this.apiUrl}/cars/makes/${makeId}/models`, { headers: this.getHeaders() });
  }
}
