export class Product {

  constructor({ id, brand, description, image, price, discount }: Product){
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.image = image;
    this.price = price;
    this.discount = discount;
  }

}

export interface Product{
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  discount: number;
}

