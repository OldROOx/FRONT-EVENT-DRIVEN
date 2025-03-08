export interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id?: number;
  customer_id: number;
  items: OrderItem[];
  total_amount: number;
  status?: string;
}
