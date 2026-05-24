import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  private geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private forecastUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<Weather> {
    return this.http.get<{ results?: Array<{ name: string; latitude: number; longitude: number }> }>(
      `${this.geocodingUrl}?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
    ).pipe(
      switchMap((geoResponse) => {
        const location = geoResponse.results?.[0];

        if (!location) {
          throw new Error('No se encontró la ciudad.');
        }

        return this.http.get<{
          current?: {
            temperature_2m: number;
            relative_humidity_2m: number;
            wind_speed_10m: number;
            weather_code: number;
          };
        }>(
          `${this.forecastUrl}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        ).pipe(
          map((weatherResponse) => {
            const current = weatherResponse.current;

            if (!current) {
              throw new Error('No se pudo obtener el clima actual.');
            }

            return {
              city: location.name,
              temp_c: current.temperature_2m,
              condition: this.getWeatherCondition(current.weather_code),
              icon: this.getWeatherIcon(current.weather_code),
              humidity: current.relative_humidity_2m,
              wind_kph: current.wind_speed_10m,
            };
          })
        );
      })
    );
  }

  private getWeatherCondition(code: number): string {
    if (code === 0) return 'Cielo despejado';
    if ([1, 2].includes(code)) return 'Parcialmente nublado';
    if (code === 3) return 'Nublado';
    if ([45, 48].includes(code)) return 'Neblina';
    if ([51, 53, 55].includes(code)) return 'Llovizna';
    if ([61, 63, 65].includes(code)) return 'Lluvia';
    if ([71, 73, 75, 77].includes(code)) return 'Nieve';
    if ([80, 81, 82].includes(code)) return 'Chubascos';
    if ([95, 96, 99].includes(code)) return 'Tormenta';

    return 'Condición meteorológica';
  }

  private getWeatherIcon(code: number): string {
    const icon =
      code === 0 ? '☀️' :
      [1, 2].includes(code) ? '⛅' :
      code === 3 ? '☁️' :
      [45, 48].includes(code) ? '🌫️' :
      [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code) ? '🌧️' :
      [71, 73, 75, 77].includes(code) ? '🌨️' :
      [95, 96, 99].includes(code) ? '⛈️' : '🌤️';

    return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#f8fafc"/><text x="64" y="82" font-size="64" text-anchor="middle">${icon}</text></svg>`)}`;
  }

}