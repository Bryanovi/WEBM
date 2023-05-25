import { Component } from '@angular/core';
import { AuthService } from './core/components/login/services/auth.service';

@Component({
  selector: 'gsv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'appGSV';
  sideNavStatus = true;
  validarExpandidoMenu(expandido: boolean) {
    this.sideNavStatus = expandido;
  }

  validarUser = this.authService.getUserLogged();

  constructor(private authService: AuthService) {}
}
