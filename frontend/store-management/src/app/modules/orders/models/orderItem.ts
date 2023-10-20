import { ProductSize } from "../../products/models/productSize.enum";

export interface OrderItem {
  id: number,
  orderId: number,
  productId: number,
  productName: string,
  productCategory: string,
  price: number,
  quantity: number;
  totalPrice: number;
  productSize: ProductSize;
}