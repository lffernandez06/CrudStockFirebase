
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interfaces';

@Component({
  selector: 'app-card-inventory',
  standalone: true,
  imports: [],
  templateUrl: './cardInventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInventoryComponent {


    constructor(private productService: ProductService){

    }

    name = input<string>('');
    price = input<number>(0);
    image = input<string | undefined>('');
    description = input<string | undefined>('');
    quantity = input<number>(0);
    id = input.required<any>();
    onDelete = output<number>();
    deletedProduct = output<Product>();
    showEditTrue = output<boolean>();
    product = output<Product>();
    editProduct = input<Product>();

 deledCard() {
  // this.onDelete.emit(this.id());
  this.deletedProduct.emit(
    {
    name: this.name(),
    quantity: this.quantity(),
    price: this.price(),
    image: this.image() ? this.image() : '',
    description: this.description() ? this.description() : '',
    id: this.id(),




  })
   }


   showPageEditTrue() {
    this.showEditTrue.emit(true);

    }

    // editProduct(product:Product) {
    //   this.product.emit({
    //     name: product.name,
    //     quantity: product.quantity,
    //     price: product.price,
    //     image: product.image,
    //     description: product.description,
    //     id: product.id,
    //   })
    // }

    emitProduct() {


     this.product.emit( {
    name: this.name(),
    quantity: this.quantity(),
    price: this.price(),
    image: this.image(),
    description: this.description(),
    id: this.id(),

  } )


    }


    // emitProduct(){
    //   this.product.emit({
    //     name: this.name(),
    //     quantity: this.quantity(),
    //     price: this.price(),
    //     image: this.image(),
    //     description: this.description(),
    //     id: this.id(),
    //   })

    // }



}
