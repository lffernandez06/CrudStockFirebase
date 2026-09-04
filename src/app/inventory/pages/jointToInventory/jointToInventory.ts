import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'joint-to-inventory',
  imports: [ReactiveFormsModule],
  templateUrl: './jointToInventory.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JointToInventory {


  private fb = inject(FormBuilder);


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}



  backbutton() {
    this.router.navigate(['/chose-inventory-distribution']);
  }

  myFormJoinInventory: FormGroup = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });


  joinInventory() {
    this.myFormJoinInventory.markAllAsTouched();
console.log(this.myFormJoinInventory.value);
}

}

