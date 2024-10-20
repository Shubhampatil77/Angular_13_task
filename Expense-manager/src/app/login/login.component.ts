import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('pharmacyName', 'Shubham');
        localStorage.setItem('city', 'Ahmedabad');
  
        this.router.navigate(['manage-expense']);
      } else {
        this.loginError = 'Invalid username or password';
      }
    }
  }
  
}
