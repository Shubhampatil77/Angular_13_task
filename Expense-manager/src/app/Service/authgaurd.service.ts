import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const pharmacyName = localStorage.getItem('pharmacyName');
    const city = localStorage.getItem('city');

    if (pharmacyName && city) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
