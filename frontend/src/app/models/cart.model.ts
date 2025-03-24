// Define the CartItem interface
export interface CartItem {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  category_id: number;
  availability: number;
  quantity: number;
}