export class Product {

  constructor({ id, name }: Product){
    this.id = id;
    this.name = name;
  }

}

export interface Product{
  id:string;
  name:string;
}

