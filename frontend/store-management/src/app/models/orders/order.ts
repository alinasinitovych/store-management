export interface Order {
    id: number;
    customerId: number;
    customerName: string;
    customerAddress: string;
    status: number;
    totalCost: number;
    orderDate: Date;
    comment:string,
    orderItems: OrderItem[];
  }
  export interface CreateOrderDto {
    id: number;
    customerId: number;
    status: number;
    orderDate: Date;
    customerAddress: string;
    comment:string,
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
  }

  export enum OrderStatus{
    New = 0,
    Paid = 1,
    Shipped = 2,
    Delivered = 3,
    Closed = 4
  } 