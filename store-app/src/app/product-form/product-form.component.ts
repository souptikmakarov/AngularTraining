import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../models/product";
import { LoggerService } from "../services/logger.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [LoggerService]
})
export class ProductFormComponent implements OnInit {

  @Input() newProduct: Product = new Product();
  @Input() formButtonText: string;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private logger: LoggerService) {}

  ngOnInit() {
  }

  submitProduct(){
    this.logger.log('Product data submitted');
    this.onSubmit.emit(this.newProduct);
  }
}
