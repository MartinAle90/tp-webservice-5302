import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency';

@Component({
  selector: 'app-currency-converter',
  imports: [FormsModule],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.scss',
})
export class CurrencyConverterComponent {
  // Variables enlazadas al formulario HTML
  cantidad: number = 1;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';
  
  // Variables para mostrar el resultado
  resultado: number | null = null;
  isLoading: boolean = false;

  // Lista de monedas disponibles (puedes agregar más)
  monedas = [
    { code: 'USD', name: 'Dólares EEUU' },
    { code: 'ARS', name: 'Pesos Argentinos' },
    { code: 'EUR', name: 'Euros' },
    { code: 'BRL', name: 'Real Brasileño' }
  ];

  constructor(
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef
  ) {}

  realizarConversion(): void {
    if (this.cantidad <= 0) {
      alert("Por favor, ingresa una cantidad válida mayor a 0.");
      return;
    }

    this.isLoading = true;
    this.resultado = null; // Limpiamos el resultado anterior
    this.cdr.detectChanges();

    this.currencyService.convertirDivisa(this.cantidad, this.monedaOrigen, this.monedaDestino)
      .subscribe({
        next: (data) => {
          this.resultado = data.result;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Error al convertir la divisa", err);
          alert("Hubo un error de conexión con la API.");
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
