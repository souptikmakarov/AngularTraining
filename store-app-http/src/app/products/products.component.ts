import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProducts().subscribe(
      (data) => { this.products = data },
      (error) => { console.log(error); }
    );
  }

  onDelete(productId) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(productId);
    }
  }
}
