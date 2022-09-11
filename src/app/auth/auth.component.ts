import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponse } from './user-info.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  isLoginMode = false;
  loading = false;
  error: string | null = null;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit() {
    this.loading = true;
    let authentication: Observable<AuthResponse>;
    const userAccaunt = { email: this.form.value['email'], password: this.form.value['password'] }
    if (this.isLoginMode){
      authentication = this.auth.login(userAccaunt)
    }
    else{
      authentication = this.auth.signup(userAccaunt)
    }
    authentication.pipe(delay(1000))
      .subscribe({
        next: response => {
          this.error = null;
          this.loading = false;
          console.log(response)
        }, error: erroeMessage => {
          this.loading = false;
          this.error = erroeMessage;
        }
      })
    this.form.reset();
    this.router.navigate(['recipes'])
  }
}
