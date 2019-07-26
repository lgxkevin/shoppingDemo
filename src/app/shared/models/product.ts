export class Product {
    title: string;
    price: number;
    description: string;
    sizeOptions: Array<string>;
    constructor(title: string, price: number, description: string, sizeOptions: Array<string>) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.sizeOptions = sizeOptions;
    }
}
