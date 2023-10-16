export interface Product {
    id: number,
    name: string,
    availableQuantity: number,
    size: number,
    price: number,
    description: string,
    categoryId: number,
    createdDate: Date
}