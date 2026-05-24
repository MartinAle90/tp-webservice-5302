import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Esto hace que el servicio esté disponible en toda la app
})
export class MoviesService {

  // url de la api
  private apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

  // Inyectamos HttpClient en el constructor
  constructor(private http: HttpClient) {
  }

  // Método para obtener las películas desde la API
  getTopMovies() : Observable<Movie[]> {
    // Configuramos los Headers exigidos por RapidAPI
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'a173f6b039msh82974f767656fdfp14d5c0jsna662ec1a3504', // Reemplaza con tu clave de RapidAPI
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    });

    // Hacemos la petición GET esperando un arreglo de tipo "Movie"
    return this.http.get<Movie[]>(this.apiUrl, { headers });
  }
}
