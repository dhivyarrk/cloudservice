import { Component, OnInit } from '@angular/core';
import { WomensclothesService } from '../womensclothes.service';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for ngFor
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // For navigation
import { CartItem} from '../models/cart.model'

@Component({
  selector: 'app-womensclothes',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './womensclothes.component.html',
  styleUrl: './womensclothes.component.scss'
})
export class WomensclothesComponent implements OnInit {
  isFormVisible = false;
    // Initialize productForm as a new FormGroup
    productForm: FormGroup = new FormGroup({
      productName: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required)
    });

  products: any[] = [];
  cartItems: CartItem[] = [];

  user_type = localStorage.getItem('user_type');

  ;



  constructor(private womensclothesService: WomensclothesService, private router: Router ) {}

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  ngOnInit(): void {
    this.loadProducts();



  }

  // Method to submit the form
  onSubmit() {
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Call the addProduct method from the product service
    this.womensclothesService.addProduct(this.productForm.value).subscribe(
      (response) => {
        alert('Product added successfully!');
        //console.log('Product added successfully:', response);
        this.loadProducts();
        // Optionally, you can redirect or reset the form here.
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

    // Getters for form controls to simplify access in the template
    get productName() { return this.productForm.get('productName'); }
    get productDescription() { return this.productForm.get('productDescription'); }
    get productPrice() { return this.productForm.get('productPrice'); }
    get categoryId() { return this.productForm.get('categoryId'); }
    get availability() { return this.productForm.get('availability'); }

  // Load all products using the service
  loadProducts() {
    this.womensclothesService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        console.log("hello");
        console.log(this.products);
        console.log(res);
      },
      error: (err) => {
        alert(err.error.message || 'Failed to load products');
      },
    });
  }

  // Delete a product
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.womensclothesService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Reload the product list
        },
        error: (err) => {
          alert(err.error.message || 'Failed to delete the product');
        },
      });
    }
  }

  // Modify a product
  modifyProduct(productId: number, updatedProduct: any) {
    this.womensclothesService.modifyProduct(productId, updatedProduct).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.loadProducts(); // Reload the product list
      },
      error: (err) => {
        alert(err.error.message || 'Failed to update the product');
      },
    });
  }

  addToCart(product_id: number, category_id: number) {
    console.log("add card called");
    const product = this.products.find(p => p.product_id === product_id);
    console.log("prod");
    console.log(product);
    if (localStorage.getItem('cartItems')) {
      const storedCartItems = localStorage.getItem('cartItems');
      this.cartItems = storedCartItems ? JSON.parse(storedCartItems) as CartItem[] : [];
      //this.cartItems = localStorage.getItem('cartItems');
      //this.cartItems = localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    
      console.log("in if in wc1");
      console.log(this.cartItems);
    }
    else {
      console.log("empyt in wc1")
      console.log(this.cartItems);

    }
    //this.cartItems = localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(this.cartItems);
    // If product is found and available
    if (product && product.availability > 0) {
      const existingItemIndex = this.cartItems.findIndex(item => item.product_id === product_id && item.category_id === category_id);
      console.log(existingItemIndex);
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, increase the quantity
        this.cartItems[existingItemIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it
        this.cartItems.push({
          ...product,
          quantity: 1
        });
      }
      console.log(this.cartItems);

      // Update localStorage with the new cart items
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      console.log('Product added to cart:', product);
    }
    //this.womensclothesService.addToCart(productId).subscribe(
    //  () => alert('Product added to cart successfully!'),
     // (error) => alert(error.error.message || 'Failed to add product to cart')
    //);
  }
}
