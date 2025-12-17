import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http'; // Importante para sua API

// Tabler Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppIcons } from './icons.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    
    // AQUI ESTÁ A CORREÇÃO:
    // Usamos importProvidersFrom para injetar a configuração dos ícones globalmente
    importProvidersFrom(TablerIconsModule.pick(AppIcons))
  ]
};