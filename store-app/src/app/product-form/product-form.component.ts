import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../models/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() newProduct: Product = new Product();
  @Input() formButtonText: string;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitProduct(){
    this.onSubmit.emit(this.newProduct);
  }
}
