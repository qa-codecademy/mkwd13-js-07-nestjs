export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export type CreateProduct = Omit<Product, 'id'>;
export type UpdateProduct = Omit<Product, 'id'>;

export interface ProductDetails extends Product {
  ordersCount: number;
}
