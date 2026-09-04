import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { Product } from '../../../interfaces/product.interfaces';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './sideBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {
  constructor(private productService: ProductService) {
    this.companyName = this.productService.companyNameServer;

  }

  cardList = signal<Product[]>([]);
  name = signal<string>('');
  price = signal<number>(0);
  quantity = signal<number>(0);
  newProduct = output<Product>();
  image = signal<string>('');
  description = signal<string>('');
  companyName!: Signal<string>;

  async ngOnInit() {
  await this.productService.consultCompanyfeatures();
}

  addCard() {
    if (!this.name() || this.price() < 0 || this.quantity() < 0) {
      return;
    }

    const newProduct: Product = {
      name: this.name(),
      quantity: this.quantity(),
      price: this.price(),
      image: this.image(),
      description: this.description(),
      id: Math.random() * 10000,
    };

    this.newProduct.emit(newProduct);
    this.resetForm()
  }



  resetForm() {
  this.name.set('');
  this.quantity.set(0);
  this.price.set(0);
  this.image.set('');
  this.description.set('');
}

}
