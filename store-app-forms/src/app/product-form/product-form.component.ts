import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  showMessage = false;

  @ViewChild('f', {static: false}) form: NgForm;
  constructor() { }

  product: Product = {
    id: 1,
    name: "Banana",
    description: "Banana",
    price: 1000,
    isAvailable: true
  }

  ngOnInit() { }

  onSubmit(){
    console.log("Product info submitted: ", this.form.value);
    this.form.reset();
  }
}

class Product{
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}