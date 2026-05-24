import { Component,OnInit, ChangeDetectorRef} from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class MoviesComponent implements OnInit {
  // Aquí guardaremos las películas que lleguen de la API
  moviesList: Movie[] = [];
  fallbackImage = '/movie-poster-placeholder.svg';

  // Variable para mostrar un "Spinner" de carga mientras llegan los datos
  isLoading: boolean = true;

  // Inyección de Dependencias: Angular nos "presta" el servicio automáticamente
  constructor(private moviesService: MoviesService, private cdr: ChangeDetectorRef) { }

  // Este método se ejecuta automáticamente cuando el componente se carga en pantalla
  ngOnInit(): void {
    this.cargarPeliculas();
  }

  // Método para cargar las películas desde la API
  cargarPeliculas() {
    // Llamamos al servicio y nos "suscribimos" a su respuesta asíncrona
    this.moviesService.getTopMovies().subscribe({
      next: (data) => {
        this.moviesList = data; // Guardamos las películas en la variable
        this.isLoading = false; // Desactivamos el "Spinner"
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar las películas:', error);
        this.isLoading = false; // Desactivamos el "Spinner" aunque haya error
        this.cdr.detectChanges();
      },
    });
  }

  handleImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.onerror = null;
    imageElement.src = this.fallbackImage;
  }
}
