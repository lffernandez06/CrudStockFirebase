import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-your-own-inventory',
  imports: [],
  templateUrl: './createYourOwnInventory.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateYourOwnInventory {
constructor(
  private router: Router
) {}
backbutton() {
    this.router.navigate(['/chose-inventory-distribution']);
  }
}
