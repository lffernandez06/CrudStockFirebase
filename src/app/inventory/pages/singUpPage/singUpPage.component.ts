import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Pipe,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './singUpPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpPageComponent {
  constructor(
    private userService: ProductService,
    private router: Router,
  ) {}

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
  });

  showMessageError(value: string): boolean {
    return !this.myForm.controls[value].pristine;
  }

  isvalidField(fieldName: string): boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }
  getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor minimo de ${errors['min'].min} `;

        case 'email':
          return `Se requiere un correo valido`;
      }
    }

    return null;
  }

  onSubmit() {
    this.userService
      .register(this.myForm.value)
      .then((response) => {
        console.log('respuesta:', response);
        this.router.navigate(['/login']);
        console.log('respuesta:gfdgfd');
      })
      .catch((error) => console.log(error));
  }

  navigateToLogIn() {
    this.router.navigate(['/login']);
  }
}
