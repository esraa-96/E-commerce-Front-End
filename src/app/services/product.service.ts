import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ProductClient:HttpClient) { }
  baseURL = 'http://localhost:3104/api/products';
  getAllProducts()
  {
    return this.ProductClient.get(this.baseURL);
  }
  getProductById(id)
  {
    return this.ProductClient.get(`${this.baseURL}/${id}`);
  }
  createProduct(product)
  {
    return this.ProductClient.post(`${this.baseURL}`,{body:product});
  }
  editProduct(id,product)
  {
    return this.ProductClient.post(`${this.baseURL}`,product);
  }

  deleteProduct(id)
  {
    return this.ProductClient.delete(`${this.baseURL}`);
  }

  getProductByName(name)
  {
    return this.ProductClient.get(`${this.baseURL}/${name}`);
  }

  addImage(image)
  {
    return this.ProductClient.put(`${this.baseURL}/image`,{body:image})
  }
  deleteImage()
  {
    
  }
}
