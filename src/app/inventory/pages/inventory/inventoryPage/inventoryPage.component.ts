import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonsComponent } from '../../../../components/buttons/buttons.component';
import { CardInventoryComponent } from '../../../../components/card/cardInventory/cardInventory.component';
import { SideBarComponent } from '../../../../components/sideBar/sideBar/sideBar.component';
import { Product } from '../../../../interfaces/product.interfaces';
import { ProductService } from '../../../../services/product.service';
import { EditPage } from '../../editPage/editPage/editPage';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CardInventoryComponent, SideBarComponent, EditPage],
  templateUrl: './inventoryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryPageComponent implements OnInit {

  showPage = signal<boolean>(false);
  cardList = signal<Product[]>([]);


  constructor(private productService: ProductService) {


  }



  ngOnInit(): void {
    this.productService.getProduct().subscribe((product) => {
      this.cardList.set(product);
    });
  }

  showPageEdit($event: boolean) {
    this.showPage.set($event);
  }
  showPageEditTrue($event: boolean) {
    this.showPage.set($event);
  }
  deletedProductFromDoc(product: Product) {
    this.productService.deletedProducts(product);
  }

  async addNewProduct(product: Product) {
    // this.cardList.update( list => [...list, product])
    const a = await this.productService.addProduct(product);

  }

  showProduct(product:Product){
    this.productService.addProductEdit(product);

  }

  // deletedCard(id:number){
  //   this.cardList.update((resp)=> resp.filter((resp) => id != resp.id  ) );
  // }
}
