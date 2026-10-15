import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private product: any = null;

  private readonly productKey = 'selectedProduct'; // Key for localStorage



  private productAdded = new BehaviorSubject<any>(null);
productAdded$ = this.productAdded.asObservable();

editProduct = new BehaviorSubject<any>(null);
  editMode = new BehaviorSubject<boolean>(false);
  productUpdated = new Subject<any>();

  setProduct(product: any) {
    this.product = product;
    localStorage.setItem(this.productKey, JSON.stringify(product)); // Save to localStorage
  }

  getProduct() {
    const productFromLocalStorage = localStorage.getItem(this.productKey);
    return productFromLocalStorage ? JSON.parse(productFromLocalStorage) : null; // Return from localStorage or null
  }

  clearProduct() {
    this.product = null;
    localStorage.removeItem(this.productKey); // Remove from localStorage
  }
  emitProduct(data: any) {
    this.productAdded.next(data);
  }
  
  clearEmittedProduct() {
    this.productAdded.next(null);
  }
  updateProduct(data: any) {
    console.log('Updated product data in service', data);
    this.productUpdated.next(data);
  }
}
