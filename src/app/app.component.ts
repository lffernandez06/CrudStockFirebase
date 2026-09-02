import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingUpPageComponent } from "./inventory/pages/singUpPage/singUpPage.component";
import { InventoryPageComponent } from "./inventory/pages/inventory/inventoryPage/inventoryPage.component";
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fire-app';
  constructor(private productService: ProductService) {}

  async ngOnInit() { await this.productService.loadCompany(); }
}
