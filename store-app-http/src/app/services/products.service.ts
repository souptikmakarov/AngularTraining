import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  private products: Product[];
  private apiUrl = "http://localhost:3000/products";

  constructor(private http: HttpClient) {
    this.products = [];
      // {
      //   id: 1,
      //   name: 'Data Structures and Algorithms',
      //   description:
      //     'An ideal book for first course on data structures and algorithms, its text ensures a style and content relevant to present-day programming.',
      //   isAvailable: true,
      //   price: 285
      // },
      // {
      //   id: 2,
      //   name: 'Premsons 608 Four Bearing Fidget Spinner',
      //   description: 'Perfect toy for fidgeters.',
      //   isAvailable: false,
      //   price: 160
      // },
      // {
      //   id: 3,
      //   name: 'Bahubali',
      //   description:
      //     "Raised in a remote tribal village, Shivudu grows up a carefree young man who relentlessly pursues his heart's desire.",
      //   isAvailable: true,
      //   price: 268
      // }
  }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
    // return this.products;
  }

  getProduct(id: number) {
    // return this.http.get<Product[]>(this.apiUrl + "/" + id);
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, productInfo: Product) {
    // const product = this.getProduct(id);

    // if (product) {
    //   product.name = productInfo.name;
    //   product.description = productInfo.description;
    //   product.isAvailable = productInfo.isAvailable;
    //   product.price = productInfo.price;
    // }
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex(product => product.id === id);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }
}
