export type OrderData = {
    ingredients: { [p: string]: number },
    price: number,
    customer: {
        name: string,
        email: string,
        addressCode: string
    }
}