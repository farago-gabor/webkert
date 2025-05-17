import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
     provideFirebaseApp(() =>
       initializeApp({ projectId: "webkert-eszszidopontfoglalo",
         appId: "1:626789136903:web:453946a24d84dd733108a2",
          storageBucket: "webkert-eszszidopontfoglalo.firebasestorage.app",
           apiKey: "AIzaSyAsB5Uvw0zM1SXSY2UkgIjzuyMfQgZUoL0",
            authDomain: "webkert-eszszidopontfoglalo.firebaseapp.com",
             messagingSenderId: "626789136903" 
        })), 
      provideAuth(() => getAuth()),
       provideFirestore(() => getFirestore())],
}).catch((err) => console.error(err));