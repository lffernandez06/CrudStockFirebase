
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-sing-up-page',
  standalone: true,
  imports: [],
  templateUrl: './singUpPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpPageComponent {


  private fb = inject(FormBuilder);

  myForm = this.fb.group({

    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['',[Validators.min(3), Validators.max(10)]],


  })


 }
