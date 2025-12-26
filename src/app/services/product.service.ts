import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interfaces';
import { BehaviorSubject, filter, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private crearProduct$ = new BehaviorSubject<Product | null>(null);

  constructor(private firestore: Firestore) {}

  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'product');
    return addDoc(productRef, product);
  }

  getProduct(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'product');
    return collectionData(productRef, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  deletedProducts(product: Product) {
    const productDocRef = doc(this.firestore, `product/${product.id}`);
    return deleteDoc(productDocRef);
  }

  addProductEdit(product: Product) {
    this.crearProduct$.next(product);
  }

  getProductEdit(): Observable<Product> {
    return this.crearProduct$
      .asObservable()
      .pipe(filter((p): p is Product => p !== null));
  }

  editProduct(id: string, product: Product) {
    const productRef = doc(this.firestore, `product/${id}`);
    const { id: _, ...productData } = product;
    return updateDoc(productRef, productData);
  }
}
