import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp( environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(
          {
            projectId: "stock-app-b9475",
            appId: "1:602421702706:web:97855ec83612f939198c2b",
            storageBucket: "stock-app-b9475.firebasestorage.app",
            apiKey: "AIzaSyCIspo0QkSjuu5nspIeDuG512pl3s9uRzE",
            authDomain: "stock-app-b9475.firebaseapp.com",
            messagingSenderId: "602421702706",
          })), provideFirestore(() => getFirestore())]
};
