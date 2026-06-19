import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

import { Product } from '../../../interfaces/product.interfaces';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-card-inventory',
  standalone: true,
  imports: [],
  templateUrl: './cardInventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInventoryComponent {

  constructor(private productService: ProductService) {}

  name = input<string>('');
  price = input<number>(0);
  description = input<string | undefined>(undefined);
  quantity = input<number>(0);
  id = input.required<number>();
  image = input<string | undefined>(undefined);
  onDelete = output<number>();
  deletedProduct = output<Product>();
  showEditTrue = output<boolean>();
  showAlertPage = output<boolean>();
  product = output<Product>();


  imagePreview = signal<string | null>(null);

  deleteCard() {
    this.deletedProduct.emit({
      name: this.name(),
      quantity: this.quantity(),
      price: this.price(),
      image: this.imagePreview() || this.image(),
      description: this.description(),
      id: this.id(),
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== 'string') return;

      this.imagePreview.set(result);
    };

    reader.readAsDataURL(file);
  }

  showAlertPageTrue() {
    this.showAlertPage.emit(true);
  }


  showPageEditTrue() {
    this.showEditTrue.emit(true);
  }

  emitProduct() {
    this.product.emit({
      name: this.name(),
      quantity: this.quantity(),
      price: this.price(),
      image: this.imagePreview() || this.image(),
      description: this.description(),
      id: this.id(),
    });
  }
}
