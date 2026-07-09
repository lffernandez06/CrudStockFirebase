import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-stock-review',
  imports: [],
  templateUrl: './stock.review.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockReview {


  productReview = input<Product | null>(null);
  closeReviewPage = output<boolean>();

  closeReview() {
    this.closeReviewPage.emit(false);
  }


}
