export class CartItem {
    title: string;
    price: number;
    quantity: number;
    sizeSelected: string;
    constructor(title: string, price: number, quantity: number, sizeSelected: string) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.sizeSelected = sizeSelected;
    }
}
