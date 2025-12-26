import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingUpPageComponent } from "./inventory/pages/singUpPage/singUpPage.component";
import { InventoryPageComponent } from "./inventory/pages/inventory/inventoryPage/inventoryPage.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SingUpPageComponent, InventoryPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fire-app';
}
