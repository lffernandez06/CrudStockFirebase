import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Product, Feature } from '../../interfaces/product.interfaces';
import { FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeaturesEdit } from '../features/featuresEdit/featuresEdit';

@Component({
  selector: 'app-stock-review',
  imports: [ReactiveFormsModule, CommonModule, FeaturesEdit],
  templateUrl: './stock.review.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockReview {
  private fb = inject(FormBuilder);
  stocks: Record<number, number | undefined> = {};
  productReview = input<Product | null>(null);
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

  generateProducts() {
    const a = this.attrributes().reduce(
      (variants, feature) => {
        return variants.flatMap((variant) =>
          feature.values.map((value) => ({
            ...variant,
            [feature.name]: value,
            id: Math.random(),
          })),
        );
      },
      [{}],
    );

    console.log(a);
    this.productsGenerated.set(a);
    return a;
  }

  saveStock(id: number, stock: number) {
    this.productsGenerated.update((products) =>
      products.map((product) =>
        product.id === id ? { ...product, stock: stock } : product,
      ),
    );
  }

  saveAllStocks() {
    this.productsGenerated.update((products) =>
      products.map((product) => ({
        ...product,
        stock: this.stocks[product.id] ?? product.stock ?? 0,
      })),
    );

    this.stocks = {};
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
  //////////////////////////////////////////////////////////

  /*CarShop */

  addToCart(_t88: any) {
    throw new Error('Method not implemented.');
  }

  deleteProduct(product: Feature) {
    this.productsGenerated.update((products: Feature[]) =>
      products.filter((p) => p.id !== product.id),
    );
  }
}
