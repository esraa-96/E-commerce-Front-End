import { Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../services/product.service';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { product } from 'src/mapModules/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  service:ProductService;
  prds;
  getAll () 
  {
      this.service.getAllProducts()
      .subscribe(
        (response) => {
          this.prds = response;
          console.log(response);
        },
        (err) => {
          console.log(err);
        });
  }  
  transform(products:[], searchTerm:string): any[] {
        if(!products || !searchTerm){
          return products;}
        return this.prds.filter(p=>p.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  

}
