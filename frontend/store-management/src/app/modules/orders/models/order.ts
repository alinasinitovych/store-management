import { OrderItem } from "./orderItem";

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  customerAddress: string;
  status: number;
  totalCost: number;
  orderDate: Date;
  comment: string,
  orderItems: OrderItem[];
}



