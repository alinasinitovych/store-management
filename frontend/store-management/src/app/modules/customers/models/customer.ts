export interface Customer {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    ordersCount: number,
    totalOrderedCost: number,
    createdDate: Date
}