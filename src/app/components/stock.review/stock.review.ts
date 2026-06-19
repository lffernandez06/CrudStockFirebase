import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-stock-review',
  imports: [],
  templateUrl: './stock.review.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockReview {

  productReview = input<Product | null>(null);




}
