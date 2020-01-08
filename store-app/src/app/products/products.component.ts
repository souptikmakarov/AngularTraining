import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { LoggerService } from '../services/logger.service';


const FORM_BUTTON_TEXT_SAVE = "Save";
const FORM_BUTTON_TEXT_ADD = "Add";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [LoggerService]
  // template: `<h4>Inline Template</h4>
  // <p>Inline paragraph</p>`,
  // styles: [`p{color:crimson}
  // h4{color:blue}`]
})
export class ProductsComponent implements OnInit {

  currentId: number = 4;
  showMessage = false;
  formButtonText = FORM_BUTTON_TEXT_ADD;
  searchText = '';

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

  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.formButtonText = FORM_BUTTON_TEXT_ADD;
  }

  hideMessage = () => {
    this.showMessage = false;
  }

  submitProduct(np) {
    if (this.formButtonText === FORM_BUTTON_TEXT_ADD){
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
    else if (this.formButtonText === FORM_BUTTON_TEXT_SAVE)
    {
      this.products = this.products.map(p => p.id == this.newProduct.id ? this.newProduct : p);
      this.newProduct = {
        id: this.currentId,
        name: "",
        price: 0,
        description: "",
        isAvailable: false
      }
      this.showMessage = true;
      this.formButtonText = FORM_BUTTON_TEXT_ADD;
      setTimeout(this.hideMessage, 2000);
    }
  }

  onDelete(toDelete){
    this.products = this.products.filter(p => p != toDelete);
    this.logger.log("Element deleted");
  }

  onEdit(toEdit){
    this.newProduct = {
      id: toEdit.id,
      name: toEdit.name,
      price: toEdit.price,
      description: toEdit.description,
      isAvailable: toEdit.isAvailable
    }
    this.formButtonText = FORM_BUTTON_TEXT_SAVE;
  }
}
