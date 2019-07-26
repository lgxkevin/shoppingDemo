import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../service/shopping.service';

import { Product } from '../shared/models/product';
import { CartItem } from '../shared/models/cartItem';

declare var $:any;
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  displayedProduct: Product;
  isSizeSelected = true;
  selectedSize: string;
  carts: Array<CartItem>;
  quantityInCart: number;
  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit() {
    this.shoppingService.getProducts().subscribe(data => {
      const { price, title, description, sizeOptions } = data;
      this.displayedProduct = new Product(title, price, description, sizeOptions);
      console.log(this.displayedProduct);
    });

    this.carts = JSON.parse(localStorage.getItem('cart')) || [];
    this.countItemsInCart();
  }
  ngOnDestroy(): void {
    localStorage.clear();
  }

  selectSize(size:string): void {
    this.isSizeSelected = true;
    this.selectedSize = size;
  }

  addToCart(): any {
    if (!this.selectedSize) {
      return this.isSizeSelected = false;
    }
    const { price, title } = this.displayedProduct;
    const cartItem = new CartItem(title, price, 1, this.selectedSize);
    if (this.carts.length === 0) {
      this.carts.push(cartItem);
    } else {
      const sameProductIndex = this.carts.findIndex(item => item.sizeSelected === cartItem.sizeSelected);
      // there is no same type of product in cart
      if (sameProductIndex === -1) {
        this.carts.push(cartItem);
      } else {
        // already have same type of product in cart
        this.carts[sameProductIndex].quantity += 1;
      }
    }
    this.countItemsInCart();
    return localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  countItemsInCart(): void {
    this.quantityInCart = this.carts.reduce((acc, current) => {
      return acc + current.quantity;
    }, 0);
  }
  showCart(): void {
    $('.dropdown-toggle').dropdown('toggle');
  }
}
