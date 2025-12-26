import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../../interfaces/product.interfaces';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-edit-page',
  imports: [],
  templateUrl: './editPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPage {


  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProductEdit().subscribe(data => {
      console.log(data, 'dsadadasda');


      this.name.set(data.name);
      this.price.set(data.price);
      this.quantity.set(data.quantity);
      this.description.set(data.description ? data.description : '' );
      this.image.set(data.image ? data.image : '');
      this.id.set(data.id);





    })


  }


  showPage = output<boolean>();
  name = signal<string>('');
  price = signal<number>(0);
  quantity = signal<number>(0);
  image = signal<string>('');
  description =signal<string>('');
  product = input<Product>()
  id = signal<number>(0);


  // newProductEdit = signal<Product>({
  //   name: this.name(),
  //   quantity: this.quantity(),
  //   price: this.price(),
  //   image: this.image(),
  //   description: this.description(),
  //   id: 0,
  // });




showEditPage() {
   this.showPage.emit(false)
}


productEdit() {

   if (this.id() === null) {
    console.warn('El ID aún no está cargado');
    return;
  }

    const updatedProduct: Product = {
      id: this.id()!,
      name: this.name(),
      price: this.price(),
      quantity: this.quantity(),
      image: this.image(),
      description: this.description(),
    };
     this.productService.editProduct(this.id()!.toString(), updatedProduct)
    .then(() => console.log('Producto actualizado'))
    .catch(err => console.error(err));
    this.showPage.emit(false)

}
}
