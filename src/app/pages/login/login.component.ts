import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service'; // importáld az AuthService-t
import { Router } from '@angular/router'; // importáld a Router-t

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email!, password!)
        .then((UserCredential) => {
          console.log('Sikeres bejelentkezés:', UserCredential);
          this.authService.updateLoginStatus(true);
          this.router.navigateByUrl('/');
        })
        .catch(error => {
          // Hibakezelés (pl. hibaüzenet megjelenítése)
          console.error('Bejelentkezési hiba:', error);
          alert('Hibás email vagy jelszó!');
        });
    } else {
      console.log('Az űrlap érvénytelen!');
    }
  }
}