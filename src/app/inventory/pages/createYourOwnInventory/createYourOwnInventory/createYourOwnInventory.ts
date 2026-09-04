import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'create-your-own-inventory',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './createYourOwnInventory.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateYourOwnInventory {

  inventoryName= signal<string>('');
  name = signal<string>('');
  private fb = inject(FormBuilder);

constructor(
  private productService: ProductService,
  private router: Router
) {}


backbutton() {
    this.router.navigate(['/chose-inventory-distribution']);
  }


  myFormCreateInventory:FormGroup = this.fb.group({
    name: [''],
    inventoryName:['']
  });


  formT(){
    console.log(this.myFormCreateInventory.value);
  }

  setInventoryFeatures(name:string, inventoryName:string) {

    this.productService.createCompany(name, inventoryName).then(() => {


        this.inventoryName.set(inventoryName);
        this.name.set(name);
        this.router.navigate(['/inventory']);
    })
    console.log('Inventory features set:', name, inventoryName);
  }}
