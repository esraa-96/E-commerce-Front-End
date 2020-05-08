import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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
    return this.ProductClient.post(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id) {
    return this.ProductClient.delete(`${this.baseURL}/${id}`);
  }

  getProductByName(name) {
    return this.ProductClient.get(`${this.baseURL}/${name}`);
  }

  addImage(image) {
    debugger;
    return this.ProductClient.put(`${this.baseURL}/image`,image);
  }
  deleteImage() {

  }
}
