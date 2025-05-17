import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-szakszerviz-idopont-foglal';
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
  this.authSubscription = this.authService.isLoggedIn().subscribe(isLogged => {
    this.isLoggedIn = isLogged;
  });
}

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
  

}
