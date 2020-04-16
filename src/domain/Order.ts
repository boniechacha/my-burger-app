export type Order = {
    id:string,
    ingredients: { [p: string]: number },
    price: number,
    customer: {
        name: string,
        email: string,
        addressCode: string
    }
}