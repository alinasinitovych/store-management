import { OrderStatus } from "./orderStatus";

export const OrderStatusText = {
    [OrderStatus.New]: 'New',
    [OrderStatus.Paid]: 'Paid',
    [OrderStatus.Shipped]: 'Shipped',
    [OrderStatus.Delivered]: 'Delivered',
    [OrderStatus.Closed]: 'Closed',
  };