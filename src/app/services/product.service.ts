import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ProductClient: HttpClient) { }
  baseURL = 'http://localhost:3104/api/products';
  getAllProducts() {
    return this.ProductClient.get(this.baseURL); 
  }
  getProductById(id) {
    return this.ProductClient.get(`${this.baseURL}/${id}`);
  }
  createProduct(product) {
    return this.ProductClient.post(`${this.baseURL}`, product);
  }
  editProduct(id, product) {
    return this.ProductClient.put(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id) {
    return this.ProductClient.delete(`${this.baseURL}/${id}`);
  }

  getProductByName(name) {
    return this.ProductClient.get(`${this.baseURL}/${name}`);
  }

  getProductByCategory(category) {
    return this.ProductClient.get(`${this.baseURL}/category/${category}`);
  }

  addImage(image) {
    //debugger;
    return this.ProductClient.put(`${this.baseURL}/image`,image);
  }

  deleteImage(image) {
    // debugger;
    // let httpParams = new HttpParams().set('productID', image["productID"]);
    //   httpParams.set('imagePath', image["imagePath"]);
    // let option={params:image}
    return this.ProductClient.post(`${this.baseURL}/image`, image)}
}
