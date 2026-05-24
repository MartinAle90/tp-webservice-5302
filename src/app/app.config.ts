import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// 1. Importamos el proveedor de HTTP de Angular
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // 2. Agregamos el proveedor de HTTP a la configuración de la aplicación
    provideHttpClient(),
  ]
};
