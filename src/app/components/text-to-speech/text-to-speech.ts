import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TtsService } from '../../services/tts';

@Component({
  selector: 'app-text-to-speech',
  imports: [FormsModule],
  templateUrl: './text-to-speech.html',
  styleUrl: './text-to-speech.scss',
})
export class TextToSpeechComponent implements OnDestroy {
  textoAConvertir: string = '';
  vozSeleccionada: string = 'echo';
  voces = [
    { code: 'echo', label: 'Echo' },
    { code: 'fable', label: 'Fable' },
  ];
  audioSource: string | null = null;
  isLoading: boolean = false;

  private currentObjectUrl: string | null = null;

  constructor(private ttsService: TtsService, private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
    }
  }

  generarAudio(): void {
    if (!this.textoAConvertir.trim()) {
      alert("Por favor, ingresa el texto que deseas convertir.");
      return;
    }

    this.isLoading = true;
    this.audioSource = null;

    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }

    this.ttsService.convertirTexto(this.textoAConvertir, this.vozSeleccionada)
      .subscribe({
        next: (blob) => {
          this.currentObjectUrl = URL.createObjectURL(blob);
          this.audioSource = this.currentObjectUrl;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al generar el audio:', error);
          alert('No se pudo generar el audio con la API.');
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }
}
