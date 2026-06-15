import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Product } from '../../../interfaces/product.interfaces';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-alert-component',
  imports: [],
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {

  constructor(private productService: ProductService) {


    }

  name = input<string>('');
  price = input<number>(0);
  image = input<string | undefined>('');
  description = input<string | undefined>('');
  quantity = input<number>(0);
  id = input<any>();
  showAlertPageFalse = output<boolean>();
  deletedProductReference = input<Product | null>(null);



  //  deledCard() {
  //   // this.onDelete.emit(this.id());
  //   this.deletedProduct.emit({
  //     name: this.name(),
  //     quantity: this.quantity(),
  //     price: this.price(),
  //     image: this.image() ? this.image() : '',
  //     description: this.description() ? this.description() : '',
  //     id: this.id(),
  //   });

  // }


    deledCard() {
      this.productService.deletedProducts(this.deletedProductReference()!);
      console.log(this.deletedProductReference());

    }

  showAlertPage() {
  this.showAlertPageFalse.emit(false)
  }
}
