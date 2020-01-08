import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "../models/product";

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
    return products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()) || p.description.toLowerCase().includes(searchText.toLowerCase()));
  }
  
}
