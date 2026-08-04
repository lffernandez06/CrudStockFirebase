


 export interface Product {

    name: string,
    quantity: number,
    price: number,
    image?: string,
    description?: string,
    id: number,
    features?: Feature[],
    variants?: Variant[],
    stock?: number,
    sku?: string,
    category?: string,
    createdAt?: Date,
    updatedAt?: Date,
  }

export interface Feature {
  name: string;
  values: string [];
  stock?: number;
  id?: number;
}


export interface Variant {
    id: string;
  stock: number;
  [key: string]: any;
}
