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
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../../../components/alerts/alert.component/alert.component";
import { StockReview } from "../../../../components/stock.review/stock.review";


@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CardInventoryComponent, SideBarComponent, EditPage, CommonModule, AlertComponent, StockReview],
  templateUrl: './inventoryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryPageComponent implements OnInit {


  showPage = signal<boolean>(false);
  cardList = signal<Product[]>([]);
  isSidebarOpen = false;
  showAlert = signal<boolean>(false);
  deletedProduct = signal<Product | null>(null);
  elementToReview = signal<Product | null>(null);
  showAlertStockPage = signal<boolean>(false);
  showSidebar = signal(true);

  constructor(private productService: ProductService) {


  }



  ngOnInit(): void {
    this.productService.getProduct().subscribe((product) => {
      this.cardList.set(product);
    });
  }

  toggleSidebar() {
  this.showSidebar.update(value => !value);
  }

  hideALertPage($event:boolean){
    this.showAlert.set($event);
  }
  showAlertPageTrue($event:boolean) {
  this.showAlert.set($event)
  }
  showPageEdit($event: boolean) {
    this.showPage.set($event);
  }
  showPageEditTrue($event: boolean) {
    this.showPage.set($event);
  }
  // deletedProductFromDoc(product: Product) {
  //   this.productService.deletedProducts(product);
  //   console.log(product);

  // // }

  // }

  saveDeletedProduct(product: Product) {
    this.deletedProduct.set(product);
    console.log(product);
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

  handleStockReview($event: Product) {
    this.elementToReview.set($event);
  }

  showStockPage($event: boolean) {
    this.showAlertStockPage.set($event);
  }

  closeReview($event: boolean) {
    this.showAlertStockPage.set($event);
  }

}
