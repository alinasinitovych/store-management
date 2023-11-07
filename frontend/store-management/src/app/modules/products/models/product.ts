export interface Product {
    id: number,
    name: string,
    availableQuantity: number,
    price: number,
    description: string,
    categoryId: number,
    categoryName: string,
    createdDate: Date
}