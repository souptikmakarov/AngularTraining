import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { LoggerService } from '../services/logger.service';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';


const FORM_BUTTON_TEXT_SAVE = "Save";
const FORM_BUTTON_TEXT_ADD = "Add";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  // template: `<h4>Inline Template</h4>
  // <p>Inline paragraph</p>`,
  // styles: [`p{color:crimson}
  // h4{color:blue}`]
})
export class ProductsComponent implements OnInit, OnDestroy {

  currentId: number = 4;
  showMessage = false;
  formButtonText = FORM_BUTTON_TEXT_ADD;
  searchText = '';
  subscription: Subscription;

  newProduct: Product = {
    id: this.currentId,
    name: "",
    price: 0,
    description: "",
    isAvailable: false
  };

  products: Product[] = [];

  constructor(private logger: LoggerService, private productsService: ProductsService) {}

  ngOnInit() {
    this.formButtonText = FORM_BUTTON_TEXT_ADD;
    this.products = this.productsService.getProducts();
    this.subscription = this.productsService.productDeleted.subscribe(() => {
      console.log("ProductComponent.ngOnInit productDeleted event received");
      this.products = this.productsService.getProducts();
    });
  }

  ngOnDestroy(){
    if (this.subscription){
      this.subscription.unsubscribe();
      console.log("Product-component onDestroy unsubscription complete");
    }
  }

  hideMessage = () => {
    this.showMessage = false;
  }

  submitProduct() {
    if (this.formButtonText === FORM_BUTTON_TEXT_ADD){
      console.log(this.newProduct);
      this.productsService.addProduct(this.newProduct);
      // this.products = this.productsService.getProducts();
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
      console.log(this.newProduct);
      // this.products = this.products.map(p => p.id == this.newProduct.id ? this.newProduct : p);
      this.productsService.editProduct(this.newProduct);
      // this.products = this.productsService.getProducts();
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
    // this.products = this.products.filter(p => p != toDelete);
    this.productsService.deleteProduct(toDelete);
    // this.products = this.productsService.getProducts();
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
