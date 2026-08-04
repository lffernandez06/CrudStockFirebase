import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Product, Feature, Variant } from '../../interfaces/product.interfaces';
import { FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeaturesEdit } from '../features/featuresEdit/featuresEdit';
import { ProductService } from '../../services/product.service';
import { async } from 'rxjs';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Component({
  selector: 'app-stock-review',
  imports: [ReactiveFormsModule, CommonModule, FeaturesEdit],
  templateUrl: './stock.review.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockReview {

  private fb = inject(FormBuilder);
  stocks: Record<number, number | undefined> = {};
  productReview = input<Product | null>();
  closeReviewPage = output<boolean>();
  showFeatures = signal<boolean>(false);
  attrributes = signal<Feature[]>([]);
  productsGenerated = signal<any[]>([]);
  productForm = this.fb.group({
    name: [''],
    newAttributes: [''],
    attributes: this.fb.array([]),
  });
  newFeatureName = signal('');
  variants = computed(() => this.generateProducts());
  editFeatureOn = signal(false);
  cardProducts = signal<Feature[]>([]);

  constructor(private productService: ProductService) {
    effect(() => {
      const product = this.productReview();

      if (!product?.id) return;

      this.loadProduct(product.id.toString());
    });
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe((product) => {
      if (!product) return;

      const variants = product.variants ?? [];

      this.productsGenerated.set(variants);

      if (variants.length) {
        const features = Object.keys(variants[0])
          .filter((key) => key !== 'stock' && key !== 'id')
          .map((key) => ({
            name: key,
            values: [...new Set(variants.map((v) => v[key as keyof Variant]))],
          }));

        this.attrributes.set(features);
      }
    });
  }

  closeReview() {
    this.closeReviewPage.emit(false);
  }

  editFeaturesOn() {
    this.editFeatureOn.set(true);
  }

  printForm() {
    console.log(this.attrributes());
  }

  printForm2() {
    console.log(this.productsGenerated());
  }
  //   createAttribute() {
  //   return this.fb.group({
  //     name: [''],
  //     values: this.fb.array([])
  //   });

  // }
  get attributes(): FormArray {
    return this.productForm.get('attributes') as FormArray;
  }

  // addAttribute() {
  //   this.attributes.push(this.createAttribute());
  // }
  get productAttribute() {
    return this.productForm.get('newAttributes')?.value;
  }

  addAttribute() {
    this.attributes.push(this.fb.control(this.productAttribute));
  }

  addValue(attributeIndex: number) {
    this.getValues(attributeIndex).push(this.fb.control(''));
  }

  getValues(attributeIndex: number): FormArray {
    return this.attributes.at(attributeIndex).get('values') as FormArray;
  }

  showFeaturesWindows() {
    this.showFeatures.set(true);
  }

  // Add objects

  addFeature(name: string) {
    const feature: Feature = {
      name: name,
      values: [],
    };
  }

  createFeature() {
    const name = this.newFeatureName().trim();

    if (!name) return;
    this.attrributes.update((features) => [
      ...features,
      {
        name,
        values: [],
      },
    ]);
    this.newFeatureName.set('');
  }

  addValue2(featureName: string, value: string, input: HTMLInputElement) {
    if (!value.trim()) return;

    /*El parámetro features es el valor actual de la señal.

Es como si Angular hiciera esto:

const features = this.attributes();

Entonces si la señal contiene:

[
  { name: 'Color', values: ['Rojo', 'Azul'] },
  { name: 'Talla', values: ['S', 'M'] }
]*/

    this.attrributes.update((features) =>
      /*2. map()
features.map(feature => ...)

map() recorre cada elemento del arreglo.

Primera vuelta:

feature = {
  name: 'Color',
  values: ['Rojo', 'Azul']
}

Segunda vuelta:

feature = {
  name: 'Talla',
  values: ['S', 'M']
}*/
      features.map((feature) =>
        feature.name === featureName
          ? { ...feature, values: [...feature.values, value] }
          : feature,
      ),
    );
    input.value = '';
  }

  async generateProducts() {
    const product = this.productReview();
    if (!product || !product.id) {
      console.error('El producto no tiene ID');
      return;
    }
    const variants = this.attrributes().reduce(
      (variants, feature) => {
        return variants.flatMap((variant) =>
          feature.values.map((value) => ({
            ...variant,
            [feature.name]: value,
            stock: 0,
            id: crypto.randomUUID(),
          })),
        );
      },
      [{} as any],
    );
    console.log(variants);
    this.productsGenerated.set(variants);
  }

  saveStock(id: number, stock: number) {
    this.productsGenerated.update((products) =>
      products.map((product) =>
        product.id === id ? { ...product, stock: stock } : product,
      ),
    );
  }

  async saveAllStocks() {
    // Actualizar signal local
    this.productsGenerated.update((products) =>
      products.map((product) => ({
        ...product,
        stock: this.stocks[product.id] ?? product.stock ?? 0,
      })),
    );

    // Guardar en Firebase
    const products = this.productsGenerated();

    await Promise.all(
      products.map((product) =>
        this.productService.updateProduct(String(product.id), {
          stock: product.stock,
        }),
      ),
    );

    this.stocks = {};
  }

  async saveVariantsProduct() {
    const product = this.productReview();
    console.log('Guardando:', product?.id, this.productsGenerated());
    if (!product?.id) {
      console.error('El producto no tiene ID');
      return;
    }

    await this.productService.saveVariants(
      product.id.toString(),
      this.productsGenerated(),
    );
  }

  removeValue(featureName: string, value: string) {
    this.attrributes.update((features) =>
      features.map((feature) =>
        feature.name === featureName
          ? { ...feature, values: feature.values.filter((v) => v !== value) }
          : feature,
      ),
    );
  }

  removeFeature(featureName: string) {

  this.attrributes.update((features) =>
    features.filter(
      (feature) => feature.name !== featureName
    )
  );

}

async updateStock(id:string,event:Event){

 const stock = +(event.target as HTMLInputElement).value;


 this.productsGenerated.update(products =>
   products.map(product =>
     product.id === id
       ? {...product,stock}
       : product
   )
 );


 const product = this.productReview();

 if(product?.id){

   await this.productService.updateVariantStock(
      product.id.toString(),
      id,
      stock
   );

 }

}
  //////////////////////////////////////////////////////////

  /*CarShop */

  addToCart(_t88: any) {
    throw new Error('Method not implemented.');
  }

  async deleteProduct(variantToDelete: Variant) {
    const product = this.productReview();

    if (!product?.id) return;

    const updatedVariants = this.productsGenerated().filter(
      (v) => v.id !== variantToDelete.id,
    );

    console.log('DESPUÉS DE BORRAR:', updatedVariants);

    this.productsGenerated.set(updatedVariants);

    await this.productService.updateVariants(
      product.id.toString(),
      updatedVariants,
    );
  }
}
