import { OrderItem } from "./orderItem";

export interface CreateOrderDto {
    id: number;
    customerId: number;
    status: number;
    orderDate: Date;
    customerAddress: string;
    comment:string,
    orderItems: OrderItem[];
  }
  