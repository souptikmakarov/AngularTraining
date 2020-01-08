import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // template: `<h4>Inline Template</h4>
  // <p>Inline paragraph</p>`,
  // styles: [`p{color:crimson}
  // h4{color:blue}`]
})
export class ProductsComponent implements OnInit {
  currentId: number = 4;
  
  newProduct: Product = {
    id: this.currentId,
    name: "",
    price: 0,
    description: "",
    isAvailable: false
  };

  products: Product[] = [
    {
      id: 1,
      name: "Dell Precision",
      price: 85000,
      description: "The best enterprise laptop with sleek aluminium finish",
      isAvailable: true
    },
    {
      id: 2,
      name: "Dell Latitude",
      price: 45000,
      description: "The best mid-range laptop with hardened plastic body",
      isAvailable: false
    },
    {
      id: 3,
      name: "Dell G7",
      price: 150000,
      description: "The best entry level gaming laptop",
      isAvailable: true
    }
  ]

  showMessage = false;

  constructor() { }

  ngOnInit() {
  }

  hideMessage = () => {
    this.showMessage = false;
    console.log(this);
  }

  addProduct() {
    this.products.unshift(this.newProduct);
    this.currentId += 1;
    this.newProduct = {
      id: this.currentId,
      name: "",
      price: 0,
      description: "",
      isAvailable: false
    }
    this.showMessage = true;
    // var self = this;
    // setTimeout(function(){
    //   self.showMessage = false;
    //   console.log(this.showMessage);
    // }, 2000);
    setTimeout(this.hideMessage, 2000);
    // setTimeout(() => {
    //   this.showMessage = false;
    // }, 2000);
  }

  showAvailibility(){
    console.log(this.newProduct.isAvailable);
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
}
