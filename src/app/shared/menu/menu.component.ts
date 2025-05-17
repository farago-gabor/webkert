import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() isLoggedIn: boolean = false;
  private sub?: Subscription;

  constructor(public authService: AuthService) {}
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.signOut().then(() => {
      console.log('Sikeres kijelentkezés');
      this.menuOpen = false;
    });
  }
}