import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products = this.cartService.getItems();
  totalPrice: number;

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    delTime: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}
  onSubmit(): void {
    // Process checkout data here
    this.products = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
    this.totalPrice = 0;
  }
  share() {
    window.alert('You successfully placed an order!');
  }
  shippingCosts!: Observable<{ type: string; price: number }[]>;

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
    this.totalPrice = this.products.reduce((acc, curr) => acc + curr.price, 0);
  }
}
