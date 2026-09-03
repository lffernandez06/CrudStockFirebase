import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'chose-inventory-distribution',
  imports: [],
  templateUrl: './choseInventoryDistribution.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoseInventoryDistribution {

constructor(

  private router: Router
) {


}

goToCreate() {
this.router.navigate(['/create-inventory']);
}
goToJoin() {
this.router.navigate(['/join-inventory']);
}
}
