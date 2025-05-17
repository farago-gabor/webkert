import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent, canActivate: [publicGuard] },
  { path: 'appointment', component: AppointmentComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [publicGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }, // 404 esetén a főoldalra irányít
];