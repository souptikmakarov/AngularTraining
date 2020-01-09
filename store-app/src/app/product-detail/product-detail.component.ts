import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../models/product";
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product = new Product();

  @Output() onProductEdit: EventEmitter<any> = new EventEmitter();

  @Output() onProductDelete: EventEmitter<any> = new EventEmitter();



  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  getStyle(p){
    if (p.isAvailable){
      return {
        color: 'blue',
        // backgroundColor: 'lightBlue'
      }
    }
    else{
      return {
        color: 'red',
        // backgroundColor: 'yellow'
      }
    }
  }

  onDelete(toDelete){
    // this.onProductDelete.emit(toDelete);
    // this.products = this.products.filter(p => p != toDelete);
    this.productsService.deleteProduct(toDelete);
  }

  onEdit(toEdit){
    this.onProductEdit.emit(toEdit);
  }
}
