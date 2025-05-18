import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

/** 
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      console.log('Regisztrációs adatok:', { name, email, password });
    } else {
      console.log('Az űrlap érvénytelen!');
    }
  }
*/

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async onSubmit(): Promise<void> {
    if (this.registrationForm.valid) {
      const { password, confirmPassword } = this.registrationForm.value;

      if (password !== confirmPassword) {
        alert('A jelszavak nem egyeznek!');
        return;
      }

      const userData = {
        name: this.registrationForm.value.name ?? '',
        email: this.registrationForm.value.email ?? '',
        devices: [],
        appointments: []
      };

      const email = this.registrationForm.value.email || '';
      const pw = this.registrationForm.value.password || '';

      try {
        await this.authService.signUp(
          email,
          pw,
          userData
        );
        console.log('Sikeres regisztráció:', userData);
        this.router.navigate(['/']);
      } catch (error: any) {
        alert('Hiba a regisztráció során: ' + (error?.message || error));
      }
    } else {
      alert('Az űrlap érvénytelen!');
    }
  }
}
