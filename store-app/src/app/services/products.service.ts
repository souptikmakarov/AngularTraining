import { Injectable } from '@angular/core';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    products : Product[] = [
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
    ];

    constructor() { }

    getProducts(): Product[] {
        // console.log("getProducts called");
        return this.products;
    }

    addProduct(product: Product){
        this.products.unshift(product);
        // console.log(this.products);
    }

    editProduct(product: Product){
        // this.products = this.products.map(p => p.id == product.id ? product : p);
        const p = this.products.find(prod => prod.id === product.id);
        p.name = product.name;
        p.description = product.description;
        p.isAvailable = product.isAvailable;
        p.price = product.price;
        // console.log(this.products);
    }

    deleteProduct(product: Product){
        var index = this.products.findIndex(p => p === product);
        this.products.splice(index, 1);
        // console.log(this.products);
    }
}
