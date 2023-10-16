import { OrderItem } from "./orderItem";

export interface CreateOrderDto {
  id: number;
  customerId: number;
  status: number;
  orderDate: Date;
  comment: string,
  orderItems: OrderItem[];
}
