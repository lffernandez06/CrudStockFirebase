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
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Feature, Product, Variant} from '../interfaces/product.interfaces';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private crearProduct$ = new BehaviorSubject<Product | null>(null);

  user = signal('');
  private companyId = signal<string | null>(null);

  constructor(private firestore: Firestore, private auth: Auth) {}


  // register({user, email, password}:any){

  //   return createUserWithEmailAndPassword(this.auth, email, password);
  // }


  // login({email, password}:any){

  //   return signInWithEmailAndPassword(this.auth, email, password);

  // }


  async login({ email, password }: any) {
    const response = await signInWithEmailAndPassword( this.auth, email, password );
    // Cargar el companyId del usuario
    await this.loadCompany(); return response; }


  // async register(email: string, password: string, companyName: string) {
  //    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
  //    const uid = cred.user.uid;
  //    // Crear empresa
  //    const companyRef = await addDoc(
  //     collection(this.firestore, 'companies'),
  //     { name: companyName, ownerId: uid, });
  //     // Guardar relación usuario - empresa
  //     await setDoc(doc(this.firestore, 'users', uid),
  //     { companyId: companyRef.id, role: 'admin', });
  //     return cred.user;
  //   }


    async register(email: string, password: string) {
      const cred = await createUserWithEmailAndPassword( this.auth, email, password );
      // Crear perfil sin empresa
      await setDoc(doc(this.firestore, 'users', cred.user.uid),
      { companyId: null, role: null }); return cred.user;


    }


    async createCompany(name: string) {
      const user = this.auth.currentUser;
      if (!user) return;
      
      const companyRef = await addDoc( 
        collection(this.firestore, 'companies'),
      { 
        name: name || 'Mi inventario', 
        ownerId: user.uid 
      } );

      await updateDoc(doc(this.firestore, 'users', user.uid), { companyId: companyRef.id, role: 'admin' });
      this.companyId.set(companyRef.id);
    }

    async loadCompany() {
      const user = this.auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(this.firestore, 'users', user.uid));
      this.companyId.set(snap.data()?.['companyId'] ?? null);
    }




      // async loadCompany() {
    //   const user = this.auth.currentUser;
    //   if (!user) return;
    //   const snap = await getDoc(
    //     doc(this.firestore, 'users', user.uid));
    //     this.companyId.set(snap.data()?.['companyId'] ?? null);
    //   }

  private productCollection() {
    const companyId = this.companyId();
    if (!companyId) { throw new Error('No hay companyId cargado'); }
    return collection( this.firestore, `companies/${companyId}/products` );
  }

  private productDoc(productId: string) {
    const companyId = this.companyId();
    if (!companyId) { throw new Error('No hay companyId cargado');

    }
    return doc( this.firestore, `companies/${companyId}/products/${productId}` );
  }


async addProduct(product: Product) {
  const productRef = this.productCollection();
  const docRef = await addDoc(productRef, product);
  return { ...product, id: docRef.id };
}


  updateFeatures(productId: string, features: Feature[]) {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  // const productRef = doc(this.firestore, 'product', productId);
  const productRef = this.productDoc(productId);
  return updateDoc(productRef, {
    features
  });
}

updateVariants(productId: string, variants: Variant[]) {
  //  const productRef = doc(
  //   this.firestore,
  //   'product',
  //   productId
  // );
  const productRef = this.productDoc(productId);

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

  // const productRef = doc(this.firestore, 'product', productId);
  const productRef = this.productDoc(productId);
  return updateDoc(productRef, {
    variants
  });
}

// getProductById(id: string) {

//   const productRef = doc(
//     this.firestore,
//     `product/${id}`
//   ) as DocumentReference<Product>;

//   return docData<Product>(productRef, {
//     idField: 'id'
//   });

// }
getProductById(id: string): Observable<Product> {
  const productRef = this.productDoc(id) as DocumentReference<Product>;
  return docData(productRef, { idField: 'id' }) as Observable<Product>; }

updateProduct(productId: string, data: Partial<Product>) {
  // const productRef = doc(this.firestore, 'product', productId);
const productRef = this.productDoc(productId);


  return updateDoc(productRef, data);
}


// async addProduct(product: Product) {
//     const productRef = collection(this.firestore, 'product');
//     const docRef = await addDoc(productRef, product);

//   return {
//     ...product,
//     id: docRef.id
//   };
//   }



  // async updateVariantStock(
  //     productId:string,
  //     variantId:string,
  //     stock:number
  //   ){

  //   const variantRef = doc(
  //     this.firestore,
  //     `products/${productId}/variants/${variantId}`
  //   );

  //   await updateDoc(variantRef,{
  //     stock
  //   });

  //   }


  // getProduct(): Observable<Product[]> {
  //   const productRef = collection(this.firestore, 'product');
  //   return collectionData(productRef, { idField: 'id' }) as Observable<
  //     Product[]
  //   >;
  // }

  // getProduct(): Observable<Product[]> {
  //   const productRef = this.productCollection();
  //   return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
  // }

  getProduct(): Observable<Product[]> {
      const companyId = this.companyId();
      if (!companyId) { return of([]);
        // no tiene inventario aún
        }

      const productRef = collection( this.firestore, `companies/${companyId}/products` );
      return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>; }

  deletedProducts(product: Product) {
    // const productDocRef = doc(this.firestore, `product/${product.id}`);
    const productDocRef = this.productDoc(product.id.toString());
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
    // const productRef = doc(this.firestore, `product/${id}`);
    const productRef = this.productDoc(id);
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
