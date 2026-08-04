import { Injectable, signal } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  DocumentReference,
} from '@angular/fire/firestore';
import { Feature, Product, Variant} from '../interfaces/product.interfaces';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private crearProduct$ = new BehaviorSubject<Product | null>(null);

  user = signal('');

  constructor(private firestore: Firestore, private auth: Auth) {}


  register({user, email, password}:any){

    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  login({email, password}:any){

    return signInWithEmailAndPassword(this.auth, email, password)

  }


  updateFeatures(productId: string, features: Feature[]) {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  const productRef = doc(this.firestore, 'product', productId);

  return updateDoc(productRef, {
    features
  });
}

updateVariants(productId: string, variants: Variant[]) {
   const productRef = doc(
    this.firestore,
    'product',
    productId
  );


  return updateDoc(productRef, {
    variants
  });
}

// async saveVariant(product: Product) {
//   const productCollection = collection(this.firestore, 'product');

//   const docRef = await addDoc(productCollection, product);

//   return {
//     ...product,
//     id: docRef.id
//   };
// }

async saveVariants(productId: string, variants: any[]) {

  const productRef = doc(this.firestore, 'product', productId);

  return updateDoc(productRef, {
    variants
  });
}

getProductById(id: string) {

  const productRef = doc(
    this.firestore,
    `product/${id}`
  ) as DocumentReference<Product>;

  return docData<Product>(productRef, {
    idField: 'id'
  });

}


updateProduct(productId: string, data: Partial<Product>) {
  const productRef = doc(this.firestore, 'product', productId);

  return updateDoc(productRef, data);
}
  async addProduct(product: Product) {
    const productRef = collection(this.firestore, 'product');
    const docRef = await addDoc(productRef, product);

  return {
    ...product,
    id: docRef.id
  };
  }

  async updateVariantStock(
      productId:string,
      variantId:string,
      stock:number
    ){

    const variantRef = doc(
      this.firestore,
      `products/${productId}/variants/${variantId}`
    );

    await updateDoc(variantRef,{
      stock
    });

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

  getOutToken():Observable<boolean> {
    const token = localStorage.getItem('token');

    return of(!!token);
  }
   isAuthenticated() {
    return authState(this.auth);
  }

  logout() {
    return signOut(this.auth);
  }

  // async uploadImage(file: File): Promise<string> {

  //   const filePath = `images/${Date.now()}_${file.name}`;
  //   const storageRef = ref(this.storage, filePath);

  //   await uploadBytes(storageRef, file);

  //   const url = await getDownloadURL(storageRef);

  //   return url;
  // }
}
