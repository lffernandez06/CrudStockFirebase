import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {


  constructor(
    private loginService: ProductService,
    private router: Router,
  ) {}

  private fb = inject(FormBuilder);

  myFormLogin: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  login() {
    this.loginService
      .login(this.myFormLogin.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/inventory']);
      })
      .catch((error) => console.log(error));
  }

   singUp() {
    this.router.navigate(['/']);
    }
}
