import { Routes } from '@angular/router';

// 1. Importamos los componentes Standalone
import { CarMakerComponent } from './components/car-maker/car-maker';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter';
import { CustomApiComponent } from './components/custom-api/custom-api';
import { MoviesComponent } from './components/movies/movies';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech';


export const routes: Routes = [
    // 2. Definimos la ruta vacía (Home) - Redirigimos a películas por defecto
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full',
    },
    {
        path: 'movies',
        component: MoviesComponent,
    },
    // 3. Mapeo de rutas para cada componente
    {
        path: 'car-maker',
        component: CarMakerComponent,
    },
    {
        path: 'currency-converter',
        component: CurrencyConverterComponent,
    },
    {
        path: 'custom-api',
        component: CustomApiComponent,
    },
    {
        path: 'text-to-speech',
        component: TextToSpeechComponent,
    },

    // 4. Comodín (Wildcard) - Si el usuario escribe cualquier cosa mal, vuelve a Home
    {
        path: '**',
        redirectTo: 'movies',
    },
];
