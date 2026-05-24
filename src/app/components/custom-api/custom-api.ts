import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weather } from '../../models/weather';
import { CustomService } from '../../services/custom';


@Component({
  selector: 'app-custom-api',
  imports: [FormsModule],
  templateUrl: './custom-api.html',
  styleUrl: './custom-api.scss',
})
export class CustomApiComponent {
  ciudad: string = '';
  weatherData: Weather | null = null;
  isLoading: boolean = false;

  constructor(private weatherService: CustomService, private cdr: ChangeDetectorRef) {}

  buscarClima(): void {
    if (!this.ciudad) return;

    this.isLoading = true;
    this.weatherData = null;
    this.cdr.detectChanges();

    this.weatherService.getWeather(this.ciudad).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert("No se encontró la ciudad.");
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
