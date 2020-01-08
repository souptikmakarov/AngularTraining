import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../models/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product = new Product();

  @Output() onProductEdit: EventEmitter<any> = new EventEmitter();

  @Output() onProductDelete: EventEmitter<any> = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }

  getStyle(p){
    if (p.isAvailable){
      return {
        color: 'blue',
        backgroundColor: 'lightBlue'
      }
    }
    else{
      return {
        color: 'red',
        backgroundColor: 'yellow'
      }
    }
  }

  onDelete(toDelete){
    this.onProductDelete.emit(toDelete);
    // this.products = this.products.filter(p => p != toDelete);
  }

  onEdit(toEdit){
    this.onProductEdit.emit(toEdit);
  }
}
