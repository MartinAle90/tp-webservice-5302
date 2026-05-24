import { Component } from '@angular/core';

// Importamos el RouterModule para poder usar routerLink y routerLinkActive en el HTML
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {}
